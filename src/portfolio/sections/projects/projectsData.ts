export const projectsData = [
    {
        title: "Agent Studio",
        description: " A local AI developer workspace combining custom multi-agent orchestration with a private, offline document Q&A (RAG) pipeline. Run custom agents and query your documents securely on your own machine using Chroma DB and local embeddings.",
        tech: ["Django", "Django Channels (WebSockets)", "Next.js", "LangGraph", "LangChain", "Chroma DB", "SQLite", "RAG"],
        image: "/assets/projects/agent-studio.png",
        github: "https://github.com/rohit-p-droid/agent-studio",
        live: "https://drive.google.com/file/d/1V0Mz8iug9WSpRZFdZx9wdNbD58YS3etu/view?usp=sharing",
    },
    {
        title: "Mind Graph",
        description: "Mind Graph is a Graph-based Retrieval-Augmented Generation (RAG) system that combines knowledge graphs with large language models. It's a prototype implementation designed to demonstrate hybrid RAG capabilities.",
        tech: ["Next.js"],
        image: "/assets/projects/mind-graph.png",
        github: "https://github.com/rohit-p-droid/mind-graph",
        // live: "https://mindgraphrag.vercel.app/",
    },
    {
        title: "Smart Resume Analyzer & Job Matcher",
        description: "Developed a MERN stack application that leverages AI (Groq) to extract and analyze resume data, providing job role suggestions. Designed and deployed a responsive, dark/light mode UI using Tailwind CSS, with secure file upload and MongoDB Atlas integration",
        tech: ["Node.js", "React.js", "Groq AI"],
        image: "/assets/projects/resume-analyzer.png",
        github: "https://github.com/rohit-p-droid/resume-analyzer-and-job-matcher-frontend",
        // live: "https://smartresumeanalyzer-fro.vercel.app",
    },
    {
        title: "RP Tools Hub",
        description: "Professional developer tools collection including JSON formatter, image converter, PDF merger, and more. All tools work offline, completely free, and require no registration.",
        tech: ["Next.js"],
        image: "/assets/projects/quick-tech-tools.png",
        github: "https://github.com/rohit-p-droid/rp-dev-tool",
        live: "https://rpdevtools.vercel.app/",
    }
]