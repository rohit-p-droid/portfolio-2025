Flat vector search finds semantically similar text. What it can't do is understand relationships — that Entity A caused Event B, which affected Entity C. That's where Graph RAG comes in.

---

## What's Wrong with Standard RAG?

To be clear, vanilla RAG is not bad. For many use cases it's perfectly sufficient. But it starts to show cracks when:

- The answer requires connecting multiple entities across different parts of a document.
- The query is about relationships (e.g., "Who are the competitors of X and what are their strategies?").
- You need multi-hop reasoning; the answer isn't in one chunk, it's assembled across several linked facts.

Standard RAG retrieves chunks based on embedding similarity. If the right chunk isn't semantically close to the query, it simply doesn't get retrieved, even if it's logically relevant.

**Graph RAG solves this by encoding knowledge structure, not just text.**

---

## The Core Idea: Knowledge Graphs + Vector Search

Instead of storing raw chunks in a vector database, we extract structured knowledge from those chunks — in the form of triplets — and store them in a graph. Each triplet looks like:

```
(source_node) --[relation]--> (destination_node)
```

For example, from a chunk about a company:

```
(Tesla) --[manufactures]--> (Model S)
(Model S) --[competes_with]--> (BMW i7)
(Elon Musk) --[CEO_of]--> (Tesla)
```

These triplets, combined with node embeddings, give us both semantic search capability and relational traversal.

---

## The Ingestion Pipeline

Here's how I build the knowledge graph from raw PDFs:

### Step 1: Extract and Chunk the PDF

Same as standard RAG, extract text and split it into manageable chunks.

```js
import { PdfReader } from "pdfreader";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function extractAndChunk(pdfPath, chunkSize = 512, overlap = 64) {
  const rawText = await extractTextFromPdf(pdfPath); // parse pages via pdfreader

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap: overlap,
  });

  return splitter.splitText(rawText);
}
```

### Step 2: Extract Triplets Using LLM

For each chunk, we prompt the LLM to extract structured triplets.

```js
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const TRIPLET_PROMPT = (chunk) => `
Extract knowledge triplets from the following text.
Each triplet must follow the format: (source, relation, destination).
Return ONLY a JSON array of objects with keys: "source", "relation", "destination".
No explanation, no markdown.

Text:
${chunk}
`;

async function extractTriplets(chunk) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: TRIPLET_PROMPT(chunk) }],
  });

  const raw = response.content[0].text.trim();
  return JSON.parse(raw);
}
```

This gives you a list like:

```json
[
  {"source": "Tesla", "relation": "manufactures", "destination": "Model S"},
  {"source": "Elon Musk", "relation": "CEO_of", "destination": "Tesla"}
]
```

### Step 3: Generate Node Embeddings

Each node is not just a name, it's a rich object carrying the source text it was extracted from, the document it belongs to, its embedding vector, and any other metadata. This is what enables vector search on the graph later, and what grounds the LLM's answers in actual source content.

```js
import OpenAI from "openai";
const openai = new OpenAI();

async function embedText(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

async function buildNodeObjects(triplets, sourceChunk, documentName, page) {
  const nodeMap = {};

  for (const t of triplets) {
    for (const entityName of [t.source, t.destination]) {
      if (!nodeMap[entityName]) {
        nodeMap[entityName] = {
          name: entityName,                        // entity name (e.g. "Tesla")
          text: sourceChunk,                       // chunk this node was extracted from
          document: documentName,                  // source PDF name
          page: page,                              // page number
          embedding: await embedText(entityName),  // vector of the node name
        };
      }
    }
  }

  return nodeMap; // { "Tesla": { name, text, document, page, embedding }, ... }
}
```

### Step 4: Deduplicate Nodes Before Storing

This is a step most tutorials skip, and it's critical. Without deduplication, you end up with Tesla, tesla, Tesla Inc. as three separate nodes, splitting your graph and breaking retrieval.

```js
function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

function deduplicateNodes(existingNodes, newNodes, threshold = 0.92) {
  // Returns mapping: newNodeName -> canonicalNodeName
  const mapping = {};

  for (const [newName, newEmb] of Object.entries(newNodes)) {
    let bestMatch = null;
    let bestScore = 0;

    for (const [existingName, existingEmb] of Object.entries(existingNodes)) {
      const score = cosineSim(newEmb, existingEmb);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = existingName;
      }
    }

    if (bestScore >= threshold) {
      mapping[newName] = bestMatch; // map to existing canonical node
    } else {
      mapping[newName] = newName;   // treat as new node
      existingNodes[newName] = newEmb;
    }
  }

  return mapping;
}
```

### Step 5: Store in Graph DB with Embeddings

I'm using Neo4j here, but the logic applies to any graph database. Each node now stores the full metadata object.

```js
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);

async function storeTriplet(session, srcNode, relation, dstNode) {
  await session.run(
    `
    MERGE (s:Node {name: $srcName})
    ON CREATE SET
      s.text = $srcText,
      s.document = $srcDoc,
      s.page = $srcPage,
      s.embedding = $srcEmb
    MERGE (d:Node {name: $dstName})
    ON CREATE SET
      d.text = $dstText,
      d.document = $dstDoc,
      d.page = $dstPage,
      d.embedding = $dstEmb
    MERGE (s)-[r:RELATION {type: $relation}]->(d)
    `,
    {
      srcName: srcNode.name,
      srcText: srcNode.text,
      srcDoc: srcNode.document,
      srcPage: srcNode.page,
      srcEmb: srcNode.embedding,
      dstName: dstNode.name,
      dstText: dstNode.text,
      dstDoc: dstNode.document,
      dstPage: dstNode.page,
      dstEmb: dstNode.embedding,
      relation,
    }
  );
}

async function ingestTriplets(triplets, nodeMap, canonicalMap) {
  const session = driver.session();
  try {
    for (const t of triplets) {
      const srcName = canonicalMap[t.source];
      const dstName = canonicalMap[t.destination];
      await storeTriplet(session, nodeMap[srcName], t.relation, nodeMap[dstName]);
    }
  } finally {
    await session.close();
  }
}
```

---

## The Retrieval Pipeline

This is where Graph RAG really earns its place.

### Step 1: Embed the Query

```js
async function embedQuery(query) {
  const output = await embedder(query, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}
```

### Step 2: Vector Search on Graph Nodes

Find the graph nodes whose embeddings are closest to the query embedding.

```js
function vectorSearchNodes(queryEmb, allNodeEmbeddings, topK = 5) {
  const scores = Object.entries(allNodeEmbeddings).map(([name, emb]) => ({
    name,
    score: cosineSim(queryEmb, emb),
  }));

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, topK).map((s) => s.name);
}
```

### Step 3: Two-Hop Graph Traversal

For each matched node, we fetch all nodes reachable within 2 hops. This is the key step, it pulls in related entities that may not have matched the query directly.

```js
async function twoHopSubgraph(session, nodeName) {
  const result = await session.run(
    `
    MATCH (n:Node {name: $name})-[r1]-(m)-[r2]-(o)
    RETURN n.name AS src,
           type(r1) AS rel1, m.name AS mid,
           type(r2) AS rel2, o.name AS dst
    `,
    { name: nodeName }
  );
  return result.records.map((r) => r.toObject());
}

async function retrieveSubgraph(matchedNodes) {
  const session = driver.session();
  const allFacts = [];
  try {
    for (const node of matchedNodes) {
      const facts = await twoHopSubgraph(session, node);
      allFacts.push(...facts);
    }
  } finally {
    await session.close();
  }
  return allFacts;
}
```

### Step 4: Format Context and Send to LLM

Since nodes now carry their source text, we include it alongside the triplet structure. This gives the LLM both the relationship graph and the original passage, making answers far more grounded.

```js
function formatGraphContext(facts) {
  return facts.map((f) => `
Relationship: ${f.src} --[${f.rel1}]--> ${f.mid} --[${f.rel2}]--> ${f.dst}
Source text (${f.srcDoc}, page ${f.srcPage}): ${f.srcText}
  `.trim()).join("\n\n");
}

async function answerQuery(query, context) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: `You are a knowledge assistant. Use the following graph facts and source passages to answer the question.
Only use information present in the facts. If the answer is not there, say so.

Graph Facts:
${context}

Question: ${query}`,
    }],
  });
  return response.content[0].text;
}
```

---

## Putting It All Together

```js
async function graphRagQuery(query, allNodeEmbeddings) {
  // 1. Embed query
  const queryEmb = await embedQuery(query);

  // 2. Find top matching nodes
  const matchedNodes = vectorSearchNodes(queryEmb, allNodeEmbeddings, 5);

  // 3. Expand via 2-hop traversal
  const facts = await retrieveSubgraph(matchedNodes);

  // 4. Format and send to LLM
  const context = formatGraphContext(facts);
  return answerQuery(query, context);
}
```

---

## Checkout the following project on graph RAG
[https://mindgraphrag.vercel.app/](https://mindgraphrag.vercel.app/)

---

## What I'd Improve Next
- **Hybrid retrieval:** Combine flat vector search (for pure semantic queries) with graph traversal (for relational queries) and let a router decide which path to take.
- **Edge embeddings:** Right now, only nodes are embedded. Embedding relations too (e.g., "causes" vs "influences") could improve traversal precision.
- **Dynamic hop depth:** Instead of a fixed 2-hop, use the query complexity to determine how deep to traverse.

---

## Wrapping Up

Graph RAG is not a silver bullet; it adds ingestion complexity and requires a graph database. But for knowledge-heavy domains where relationships matter, it's a meaningful upgrade over flat vector search. The combination of embedding-based retrieval with graph traversal gives you both semantic flexibility and structural precision.

If you're already running a RAG pipeline and finding that multi-entity queries are returning incomplete answers, Graph RAG is worth the investment.

Have questions or a different approach? Reach out, always happy to discuss.