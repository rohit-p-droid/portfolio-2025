export const experienceData = [
    {
        role: "Software Engineer – AI & Full Stack",
        company: "Netwin Infosolutions",
        fromDate: "2024-08-01T00:00:00.000Z",
        toDate: null,
        location: "Nashik, India",
        type: "Full-Time",
        techStack: [
            "Python",
            "LangGraph",
            "LangChain",
            "Qdrant",
            "OpenAI GPT Live",
            "MCP",
            "Django",
            "DRF",
            "NestJS",
            "gRPC",
            "Docker",
            "Kubernetes",
            "Jenkins"
        ],
        description: [
            "AI Product: Built and deployed a production RAG solution (Python, LangGraph, LangChain, Qdrant, LLMs) that automated client documentation workflows and cut manual documentation effort by 60%.",
            "Multi-Agent Systems: Designed LangGraph/LangChain agents that retrieve information, reason over context and execute workflow tasks for documentation and operations.",
            "Voice AI & MCP: Integrated GPT Live into the Q&A agent with session management and delegation; built a Jira MCP server so LLM agents can retrieve, query and triage tickets.",
            "Retrieval Quality: Designed hybrid retrieval (Qdrant embeddings + keyword search) with contextual query refinement over enterprise documentation.",
            "AI Scrum Master: Built an AI scrum-master agent that sends scheduled messages via cron jobs and supports both real-time chat and email-based chat (email conversations processed through cron jobs).",
            "E-commerce Automation: Built cron-driven bulk product onboarding for an e-commerce project, creating products from uploaded Excel sheets and images along with related catalog data.",
            "Backend & APIs: Built REST APIs and enterprise integrations with Django, DRF, NestJS and Node.js; connected Python AI microservices to NestJS services over gRPC.",
            "Data & Architecture: Engineered a zero-downtime migration from a single-tenant database to a multi-tenant NestJS/MongoDB architecture without a full rewrite.",
            "Cloud & DevOps: Owned the Jenkins → Docker → Kubernetes CI/CD pipeline, cutting deployment time by 40% and enabling zero-downtime releases."
        ],
    },
    {
        role: "Software Engineer Intern – Backend",
        company: "Netwin Infosolutions",
        fromDate: "2024-02-15T00:00:00.000Z",
        toDate: "2024-07-15T00:00:00.000Z",
        location: "Nashik, India",
        type: "Internship",
        techStack: ["Django", "Django REST Framework", "SDP Integration", "Python", "PostgreSQL", "Cron Jobs"],
        description: [
            "Built a production Django REST Framework service-ticketing system with role-based workflows for a live mobile application.",
            "Two-Way Sync: Built cron-job-based two-way sync between the ticketing system and the legacy SDP service: tickets created on either platform appeared on the other, and updates and other ticket actions stayed consistent on both.",
            "Automated Technician Engine: Developed an automated technician assignment engine using availability and workload scoring, reducing unassigned-ticket SLA breaches by 40%.",
            "Billing Automation: Automated time-based billing calculations, removing manual effort and reducing billing errors."
        ],
    }
];