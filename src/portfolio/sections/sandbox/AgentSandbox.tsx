import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTerminal, FaRobot, FaSearch, FaCode, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface LogLine {
  sender: string;
  message: string;
  type: "system" | "orchestrator" | "worker" | "error" | "success";
}

interface Task {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  agents: string[];
  logs: LogLine[];
}

const tasks: Task[] = [
  {
    id: "rag",
    title: "RAG Knowledge Synthesis",
    description: "Embeds a PDF, indexes chunks in Qdrant, and runs a semantic search query.",
    icon: <FaSearch className="text-cyan-500" />,
    agents: ["Ingestor", "Embedder", "VectorDB", "Retriever", "Synthesizer"],
    logs: [
      { sender: "System", message: "Initializing RAG Agent pipeline...", type: "system" },
      { sender: "Ingestor", message: "Loading document: 'multi-agent-coordination-study.pdf' (12.4 KB)...", type: "worker" },
      { sender: "Ingestor", message: "Splitting document into semantic chunks (overlap=100, chunk_size=512)...", type: "worker" },
      { sender: "Embedder", message: "Generating text embeddings using local Ollama model...", type: "worker" },
      { sender: "VectorDB", message: "Inserting 24 document vectors into Qdrant collection...", type: "worker" },
      { sender: "VectorDB", message: "Qdrant collection updated successfully.", type: "success" },
      { sender: "Retriever", message: "Searching collection for: 'How to resolve agent coordination bottlenecks?'", type: "worker" },
      { sender: "Retriever", message: "Found 3 matching chunks (highest cosine similarity: 0.89)", type: "success" },
      { sender: "Synthesizer", message: "Context injected. Generating response using Claude-3.5-Sonnet...", type: "worker" },
      { sender: "Synthesizer", message: "Answer: 'Coordination bottlenecks are solved by implementing a centralized state machine with AsyncLocalStorage for request tracking.'", type: "success" },
      { sender: "System", message: "Query answered successfully in 2.4 seconds.", type: "system" }
    ]
  },
  {
    id: "code-exec",
    title: "Coder Sandbox & Self-Correction",
    description: "Coder writes matrix multiplication code, hits a library error, and refactors it.",
    icon: <FaCode className="text-green-500" />,
    agents: ["Orchestrator", "Coder", "DockerSandbox", "Debugger"],
    logs: [
      { sender: "System", message: "Initializing Sandbox Runtime Environment...", type: "system" },
      { sender: "Orchestrator", message: "Task: 'Write a python function to compute parallel matrix multiplication.'", type: "orchestrator" },
      { sender: "Coder", message: "Generating python script (matrix_multiply.py)...", type: "worker" },
      { sender: "DockerSandbox", message: "Running file matrix_multiply.py in Docker container...", type: "worker" },
      { sender: "DockerSandbox", message: "Exception caught: ModuleNotFoundError: No module named 'numpy'", type: "error" },
      { sender: "Orchestrator", message: "Reporting failure to Coder. Initiating self-correction loop.", type: "orchestrator" },
      { sender: "Debugger", message: "Analyzing execution trace. Cause: Missing numpy dependency. Recommendation: Implement pure python matrix math.", type: "worker" },
      { sender: "Coder", message: "Refactoring logic to use standard nested loops instead of external packages...", type: "worker" },
      { sender: "DockerSandbox", message: "Rerunning corrected file matrix_multiply.py in Docker container...", type: "worker" },
      { sender: "DockerSandbox", message: "Execution successful. Output: [[12, 18], [24, 30]]", type: "success" },
      { sender: "System", message: "Task solved successfully after 1 self-correction loop.", type: "system" }
    ]
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Team Collaboration",
    description: "Orchestrator delegates a cryptocurrency alert task across a team of 4 specialized agents.",
    icon: <FaRobot className="text-purple-500" />,
    agents: ["Orchestrator", "Planner", "WebSearch", "Coder", "Verifier"],
    logs: [
      { sender: "System", message: "Bootstrapping Agent Hive...", type: "system" },
      { sender: "Orchestrator", message: "Task: 'Research and write code to fetch current Bitcoin price and alert user if it drops below $60k.'", type: "orchestrator" },
      { sender: "Orchestrator", message: "Spawning Planner Agent...", type: "orchestrator" },
      { sender: "Planner", message: "Proposed workflow: 1. WebSearch (get endpoint) 2. Coder (write fetching script) 3. Verifier (review security).", type: "worker" },
      { sender: "WebSearch", message: "Querying: 'Coingecko API get simple price Bitcoin'...", type: "worker" },
      { sender: "WebSearch", message: "Found endpoint: https://api.coingecko.com/api/v3/simple/price", type: "success" },
      { sender: "Coder", message: "Implementing Python alert service using requests and dotenv...", type: "worker" },
      { sender: "Verifier", message: "Reviewing code... Alert threshold is hardcoded in code. Recommending refactoring to load from system environment.", type: "error" },
      { sender: "Coder", message: "Refactored script to read threshold value from variable BTC_ALERT_VAL.", type: "worker" },
      { sender: "Verifier", message: "Code reviewed. No security risks found. Script approved.", type: "success" },
      { sender: "System", message: "Agent team completed task successfully.", type: "system" }
    ]
  }
];

const AgentSandbox = () => {
  const [selectedTaskId, setSelectedTaskId] = useState("multi-agent");
  const [running, setRunning] = useState(false);
  const [currentLogs, setCurrentLogs] = useState<LogLine[]>([]);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const currentTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  useEffect(() => {
    // Reset terminal when task changes
    setCurrentLogs([]);
    setActiveAgent(null);
    setRunning(false);
  }, [selectedTaskId]);

  useEffect(() => {
    // Auto-scroll terminal
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentLogs]);

  const runAgentTask = () => {
    if (running) return;
    setRunning(true);
    setCurrentLogs([]);
    setActiveAgent("Orchestrator");

    let logIndex = 0;
    const logsToPrint = currentTask.logs;

    const printNextLog = () => {
      if (logIndex < logsToPrint.length) {
        const nextLog = logsToPrint[logIndex];
        
        // Update active agent based on sender
        if (nextLog.sender !== "System" && nextLog.sender !== "DockerSandbox" && nextLog.sender !== "VectorDB") {
          setActiveAgent(nextLog.sender);
        } else if (nextLog.sender === "System") {
          setActiveAgent(null);
        }

        setCurrentLogs(prev => [...prev, nextLog]);
        logIndex++;
        
        // Dynamically vary execution delays for realistic simulator pacing
        const delay = nextLog.type === "error" || nextLog.type === "success" ? 1800 : 1200;
        setTimeout(printNextLog, delay);
      } else {
        setRunning(false);
        setActiveAgent(null);
      }
    };

    setTimeout(printNextLog, 600);
  };

  return (
    <section
      id="sandbox"
      className="px-6 sm:px-12 py-24 bg-gradient-to-b from-white via-cyan-50 to-blue-50 dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 select-none">
            Interactive Agentic Demo
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Agent Sandbox
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Select a cognitive task and deploy an autonomous multi-agent swarm to execute reasoning loops, access RAG tools, and self-correct on failures.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Controls & Agent Graph Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Task Selector Box */}
            <div className="p-5 rounded-3xl bg-white/70 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/80 dark:border-gray-800/60 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-gray-800/50 pb-2">
                1. Select Agentic Task
              </h3>
              <div className="space-y-3">
                {tasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => !running && setSelectedTaskId(task.id)}
                    disabled={running}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 select-none ${
                      selectedTaskId === task.id
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/10 border-blue-500/50 shadow-md"
                        : "bg-white dark:bg-gray-900/10 border-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/20"
                    } ${running ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                      {task.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{task.title}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{task.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Live Graph Viz */}
            <div className="p-5 rounded-3xl bg-white/70 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/80 dark:border-gray-800/60 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-gray-800/50 pb-2 flex items-center justify-between">
                <span>2. Agent Hive Flow</span>
                {running && (
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                    Executing...
                  </span>
                )}
              </h3>

              {/* Dynamic SVG / Node Agent Map */}
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/40 rounded-2xl relative min-h-[220px]">
                {/* Orchestrator Center Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeAgent === "Orchestrator"
                      ? "bg-blue-600 border-blue-400 text-white scale-110 shadow-blue-500/30"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400"
                  }`}>
                    <FaRobot className="text-2xl" />
                  </div>
                  <span className="text-[10px] font-bold mt-1">Orchestrator</span>
                </div>

                {/* Worker Nodes Circle layout */}
                <div className="flex justify-between w-full mt-8 gap-4">
                  {currentTask.agents.filter(a => a !== "Orchestrator").map((agent, index) => {
                    const isActive = activeAgent === agent;
                    return (
                      <div key={agent} className="flex flex-col items-center relative">
                        {/* Connecting line to central Orchestrator */}
                        <div className={`absolute bottom-full h-8 w-[2px] transition-all duration-300 ${
                          isActive ? "bg-cyan-500 animate-pulse" : "bg-gray-200 dark:bg-gray-800"
                        }`} />

                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-md transition-all duration-300 ${
                          isActive
                            ? "bg-cyan-500 border-cyan-300 text-white scale-110 shadow-cyan-500/30"
                            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                        }`}>
                          {agent === "Ingestor" || agent === "WebSearch" ? <FaSearch className="text-sm" /> : 
                           agent === "Coder" ? <FaCode className="text-sm" /> :
                           agent === "Verifier" || agent === "VectorDB" ? <FaCheckCircle className="text-sm" /> :
                           <FaRobot className="text-sm" />}
                        </div>
                        <span className="text-[9px] font-bold mt-1.5 text-center leading-tight max-w-[70px]">
                          {agent}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Run CTA Button */}
              <button
                onClick={runAgentTask}
                disabled={running}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                  running ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <FaPlay className="text-xs" />
                <span>Deploy Agent Swarm</span>
              </button>
            </div>

          </div>

          {/* Terminal Console Column */}
          <div className="lg:col-span-7 h-full">
            <div className="rounded-3xl border border-gray-800 bg-[#070a13] shadow-2xl flex flex-col overflow-hidden max-w-full font-mono text-xs select-text">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#0d111d] border-b border-gray-900/60 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                    <FaTerminal className="text-xs text-blue-500" />
                    <span>agent_sandbox_console.sh</span>
                  </div>
                </div>
                <div className="text-[9px] text-gray-600 dark:text-gray-500 uppercase tracking-widest font-bold">
                  Live Terminal
                </div>
              </div>

              {/* Console Logs Body */}
              <div className="p-6 h-[400px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {currentLogs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-600 dark:text-gray-500 space-y-3 py-16">
                    <FaTerminal className="text-3xl text-gray-800 dark:text-gray-700 animate-pulse" />
                    <p className="max-w-[280px] leading-relaxed text-xs">
                      Console idle. Choose a task on the left and click "Deploy Agent Swarm" to witness execution logs.
                    </p>
                  </div>
                )}

                <AnimatePresence>
                  {currentLogs.map((log, idx) => {
                    const isSystem = log.type === "system";
                    const isOrchestrator = log.type === "orchestrator";
                    const isSuccess = log.type === "success";
                    const isError = log.type === "error";

                    let tagColor = "text-gray-400";
                    let msgColor = "text-gray-300";
                    let icon = null;

                    if (isSystem) {
                      tagColor = "text-cyan-400 font-bold";
                      msgColor = "text-cyan-200/90";
                    } else if (isOrchestrator) {
                      tagColor = "text-blue-400 font-bold";
                      msgColor = "text-blue-100/90";
                    } else if (isSuccess) {
                      tagColor = "text-green-400 font-bold";
                      msgColor = "text-green-300";
                      icon = <FaCheckCircle className="text-green-500 text-[10px] inline shrink-0" />;
                    } else if (isError) {
                      tagColor = "text-red-400 font-bold";
                      msgColor = "text-red-300";
                      icon = <FaExclamationTriangle className="text-red-500 text-[10px] inline shrink-0" />;
                    }

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-2 items-start leading-relaxed whitespace-pre-wrap py-0.5 border-l border-transparent hover:border-gray-800/40 pl-2 transition-all"
                      >
                        <span className="text-gray-600 select-none text-[10px] shrink-0 font-normal">
                          {`[00:0${idx}]`}
                        </span>
                        
                        <div className="flex gap-1.5 items-start">
                          {icon}
                          <span className={`shrink-0 tracking-wide ${tagColor}`}>
                            {`[${log.sender}]`}
                          </span>
                          <span className={msgColor}>
                            {log.message}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AgentSandbox;
