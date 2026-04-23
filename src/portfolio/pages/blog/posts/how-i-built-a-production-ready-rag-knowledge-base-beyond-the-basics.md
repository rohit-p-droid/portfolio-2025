Most RAG tutorials show you how to embed a PDF and call it done. Here's what a real implementation actually looks like.

---

## The Problem
Our team needed a knowledge base search system where users could upload documents and ask natural language questions, and get accurate, context-aware answers. Not just keyword search. Not just "find the document." Actually understand the question and retrieve the right information.

Simple enough on paper. But the moment you go beyond a single document and a single user, the naive RAG approach breaks down fast. Here's how I built it properly.

---

## The Architecture - Overview
Before diving in, here's the full pipeline:
<div style="display:flex; gap:16px;">

<img src="/assets/blogs/rag-ingestion-pipeline.png" alt="Ingestion Pipeline" width="40%" />
<img src="/assets/blogs/rag-query-pipeline.png" alt="Query Pipeline" width="40%" />

</div>

---

## Part 1 - The Ingestion Pipeline

### Document Upload and Storage
The entry point is a standard CRUD API. Users upload documents, which are stored on the server. Each document gets metadata assigned at upload time — specifically type and tags.

```js
// Document schema (simplified)
{
  id: string,
  filename: string,
  filePath: string,
  type: string,      // e.g. "policy", "manual", "faq"
  tags: string[],    // e.g. ["hr", "onboarding", "2024"]
  status: "pending" | "processing" | "ready",
  createdAt: Date
}
```
This metadata is the foundation for filtered retrieval later. Most tutorials skip this entirely — they treat all documents as equal. In production, you almost always want to scope searches by document type or category.

### Queue-Based Vectorization
Here's a mistake a lot of developers make: they vectorize documents synchronously in the same API call as the upload. That works for one document. It breaks when users upload large files or multiple documents at once.

I used a queue (RabbitMQ) to handle vectorization asynchronously. The upload API returns immediately, and a background worker picks up the job.

```js
// On document upload — push to queue
await rabbitMQService.publish('document.vectorize', {
  documentId: document.id,
  filePath: document.filePath,
  type: document.type,
  tags: document.tags
});

// Background worker processes the job
async processDocument(job: DocumentJob) {
  const chunks = await this.chunkDocument(job.filePath);
  await this.vectorizeAndStore(chunks, job);
  await this.updateDocumentStatus(job.documentId, 'ready');
}
```
This keeps the API fast and the processing reliable.

### Chunking with Overlap
The document text is split into chunks before embedding. The key decision here is chunk size and overlap.

> **Why overlap matters:** Imagine the answer to a question spans the boundary between two chunks. Without overlap, you'd miss it — one chunk has the first half, the other has the second half, and neither has enough context to be retrieved as the top result.

With overlap, each chunk includes a portion of the previous chunk's text, preserving that context boundary.

```js
async chunkDocument(filePath: string): Promise<Chunk[]> {
  const text = await this.extractText(filePath);
  const chunks: Chunk[] = [];
  const chunkSize = 500;      // tokens
  const overlapSize = 50;     // tokens of overlap

  for (let i = 0; i < text.length; i += chunkSize - overlapSize) {
    const chunk = text.slice(i, i + chunkSize);
    if (chunk.trim().length > 0) {
      chunks.push({ text: chunk, index: chunks.length });
    }
  }
  return chunks;
}
```

### Storing in Qdrant with Metadata
Each chunk is embedded using OpenAI's embedding model and stored in Qdrant. The metadata document type and tags is stored alongside each vector as a payload.

```js
async vectorizeAndStore(chunks: Chunk[], job: DocumentJob) {
  const points = await Promise.all(chunks.map(async (chunk, i) => {
    const embedding = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk.text
    });

    return {
      id: `${job.documentId}-${i}`,
      vector: embedding.data[0].embedding,
      payload: {
        documentId: job.documentId,
        text: chunk.text,
        type: job.type,           // stored for filtering
        tags: job.tags,           // stored for filtering
        chunkIndex: i
      }
    };
  }));

  await this.qdrantClient.upsert('knowledge-base', { points });
}
```
This is where the metadata investment pays off—Qdrant lets you filter by payload fields before or during vector search.

---

## Part 2 - The Query Pipeline
This is where most of the interesting engineering happens.

### The Problem with Naive Query Search
Take this user conversation:

> **User:** What is the leave policy for new employees?
> 
> **Agent:** New employees get 12 days of casual leave per year...
> 
> **User:** What about for seniors?

A naive RAG system would search for "what about for seniors" and get garbage results. The word "seniors" has no context. The actual query should be "leave policy for senior employees."

This is the problem the query refinement layer solves.

### Query Refinement Layer
Before searching the vector database, I send the user's raw query to the LLM along with the recent conversation history. The LLM's job is to return a refined, self-contained query that can be understood without any surrounding context.

```js
async refineQuery(rawQuery: string, conversationHistory: Message[]): Promise<RefinedQuery> {
  const response = await this.openai.responses.create({
    model: 'gpt-4o',
    input: [
      {
        role: 'system',
        content: `You are a query refinement assistant. Given a user's question and conversation history, return a JSON object with:
          - refinedQuery: a complete, self-contained version of the question
          - keywords: array of key terms for search filtering
          
          Return only valid JSON, no explanation.`
      },
      ...conversationHistory.slice(-6),  // last 3 turns
      {
        role: 'user',
        content: rawQuery
      }
    ]
  });

  return JSON.parse(response.output_text);
}

// Example output for "What about for seniors?":
// {
//   refinedQuery: "What is the leave policy for senior employees?",
//   keywords: ["leave policy", "senior employees", "annual leave"]
// }
```
This single layer dramatically improves retrieval quality for multi-turn conversations.

### Vector Search with Metadata Filtering
With the refined query and keywords in hand, I search Qdrant using both the embedding and metadata filters.

```js
async searchKnowledgeBase(
  refinedQuery: string,
  filters?: { type?: string; tags?: string[] }
): Promise<SearchResult[]> {
  const queryEmbedding = await this.openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: refinedQuery
  });

  const filter = filters ? {
    must: [
      ...(filters.type ? [{ key: 'type', match: { value: filters.type } }] : []),
      ...(filters.tags?.length ? [{ key: 'tags', match: { any: filters.tags } }] : [])
    ]
  } : undefined;

  const results = await this.qdrantClient.search('knowledge-base', {
    vector: queryEmbedding.data[0].embedding,
    limit: 5,
    filter,
    with_payload: true
  });

  return results.map(r => ({
    text: r.payload.text,
    score: r.score,
    documentId: r.payload.documentId,
    type: r.payload.type
  }));
}
```
Filtering by type and tags before semantic search means you're only comparing against relevant vectors, faster and more accurate.

### Context Validation Layer (Experimental)
After retrieval, I added an optional validation step. Before passing the chunks to the final LLM call, I ask the LLM to check whether the retrieved context actually contains relevant information to answer the query.

```js
async validateContext(query: string, retrievedChunks: SearchResult[]): Promise<boolean> {
  const context = retrievedChunks.map(c => c.text).join('\n\n');

  const response = await this.openai.responses.create({
    model: 'gpt-4o-mini',  // cheaper model for validation
    input: [
      {
        role: 'system',
        content: 'Does the provided context contain sufficient information to answer the question? Reply with only "yes" or "no".'
      },
      {
        role: 'user',
        content: `Question: ${query}\n\nContext:\n${context}`
      }
    ]
  });

  return response.output_text.trim().toLowerCase() === 'yes';
}
```
If validation returns false, I either fall back to a broader search (removing filters) or tell the user the knowledge base doesn't have relevant information, rather than hallucinating an answer.

### Final Answer Generation
If validation passes, the retrieved chunks and refined query go to the final LLM call:

```js
async generateAnswer(
  refinedQuery: string,
  context: SearchResult[],
  conversationHistory: Message[]
): Promise<string> {
  const contextText = context.map(c => c.text).join('\n\n---\n\n');

  const response = await this.openai.responses.create({
    model: 'gpt-4o',
    input: [
      {
        role: 'system',
        content: `You are a helpful knowledge base assistant. Answer the user's question using only the provided context. If the context doesn't contain the answer, say so clearly. Do not make up information.`
      },
      ...conversationHistory.slice(-6),
      {
        role: 'user',
        content: `Context:\n${contextText}\n\nQuestion: ${refinedQuery}`
      }
    ]
  });

  return response.output_text;
}
```

---

## What I Learned
- Query refinement is the highest-leverage improvement you can make. Everything else is marginal without it. If your users will have multi-turn conversations, build this first.
- Metadata at ingestion time is worth the upfront investment. It feels like overhead when you're building. It's essential when you have 10,000 documents and users want answers scoped to specific categories.
- Async vectorization is not optional at scale. Even if you start synchronous, design for async from day one.
- The context validation layer is worth experimenting with. It adds a small latency cost but prevents the worst failure mode of RAG — confident wrong answers.
- Chunk size is a dial, not a decision. I landed on 500 tokens with 50 token overlap for my use case. Yours will be different. Test it.
- Built with: NestJS · OpenAI Responses API · Qdrant · RabbitMQ · React

If you found this useful, connect with me on LinkedIn or check out my other projects on GitHub.