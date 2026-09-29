export const projectsData = [
    {
        title: "Agent Studio",
        tag: "Multi-Provider AI Agents & RAG",
        description: "A multi-provider (OpenAI, Gemini, Groq, Claude) AI agent platform built with Next.js and Django. Features configurable autonomous agents, real-time chat, document Q&A with private RAG, and session persistence via Django ORM.",
        tech: ["Next.js", "React", "Django", "Django ORM", "SQLite", "RAG", "Multi-Provider LLMs"],
        image: "/assets/projects/agent-studio.png",
        github: "https://github.com/rohit-p-droid/agent-studio",
        live: "https://drive.google.com/file/d/1V0Mz8iug9WSpRZFdZx9wdNbD58YS3etu/view?usp=sharing",
    },
    {
        title: "Mind Graph",
        tag: "Graph RAG & Knowledge Graph Traversal",
        description: "Graph RAG application: PDFs are ingested, LLM-extracted triplets are stored in a Neo4j knowledge graph, and natural-language queries execute hybrid vector search plus 2-hop graph traversal. Built with Next.js 14 API routes and interactive chat UI.",
        tech: ["Next.js 14", "TypeScript", "Neo4j", "Gemini", "LangChain", "Graph RAG", "Vercel"],
        image: "/assets/projects/mind-graph.png",
        github: "https://github.com/rohit-p-droid/mind-graph",
        live: "https://mindgraphrag.vercel.app/",
    },
    {
        title: "Quick Tech Tools",
        tag: "High-Performance Developer Suite",
        description: "A multi-tool web app (PDF tools, video processor, image compressor, JSON formatter, QR & color-palette generators) built as modular React components with custom hooks & Context. Lazy-loads heavy modules (FFmpeg.wasm, pdf-lib) with dynamic imports.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FFmpeg.wasm", "pdf-lib", "Vercel"],
        image: "/assets/projects/quick-tech-tools.png",
        github: "https://github.com/rohit-p-droid/rp-dev-tool",
        live: "https://quicktechtools.dev",
    },
    {
        title: "Smart Resume Analyzer & Job Matcher",
        tag: "GenAI & NLP Parsing",
        description: "Full-stack AI platform leveraging high-speed Groq LLM inference to parse resume data, extract candidate skill profiles, evaluate ATS compatibility, and match candidates against targeted job descriptions.",
        tech: ["React.js", "Node.js", "Groq AI (Llama 3)", "MongoDB Atlas", "Tailwind CSS"],
        image: "/assets/projects/resume-analyzer.png",
        github: "https://github.com/rohit-p-droid/resume-analyzer-and-job-matcher-frontend",
        live: "https://smartresumeanalyzer-fro.vercel.app",
    }
];