import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { FaCheck } from 'react-icons/fa';
import './SmartTextRenderer.css';
import Mermaid from './Mermaid';

interface SmartTextRendererProps {
    text: string;
    className?: string;
}

// Custom CodeBlock Component for syntax highlighting
const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const highlighted = useMemo(() => {
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch (e) {
      return code;
    }
  }, [code, language]);

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700/60 shadow-lg font-mono text-sm max-w-full group" style={{ backgroundColor: '#282c34' }}>
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800/85 border-b border-gray-200 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400 select-none">
        <div className="flex items-center gap-2">
          {/* Mock Window Controls */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80"></span>
          </div>
          <span className="font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 transition-all active:scale-95 cursor-pointer font-sans text-xs"
        >
          {copied ? (
            <>
              <FaCheck className="text-green-500 text-[10px] animate-bounce" />
              <span className="text-green-600 dark:text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <pre className="pt-1 pb-3 px-4 m-0 overflow-x-auto text-[#abb2bf] leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent max-h-[500px]" style={{ backgroundColor: '#282c34' }}>
        <code 
          className={`hljs language-${language} block font-mono text-[13px] md:text-sm`}
          style={{ whiteSpace: 'pre', wordSpacing: 'normal', wordBreak: 'normal' }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};

const SmartTextRendere: React.FC<SmartTextRendererProps> = ({
    text,
    className = ''
}) => {
    return (
        <div className={`smart-text-renderer ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Prevent duplicate packaging boxes and padding around custom components
                    pre: ({ children }) => <>{children}</>,
                    // Custom code component mapping
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeVal = String(children).replace(/\n$/, '');
                        const isInline = !match && !codeVal.includes('\n');
                        
                        if (!isInline) {
                            if (match && match[1] === 'mermaid') {
                                return <Mermaid chart={codeVal} />;
                            }
                            return (
                                <CodeBlock 
                                    code={codeVal} 
                                    language={match ? match[1] : 'code'} 
                                />
                            );
                        }
                        
                        return (
                            <code 
                                className="bg-gray-100 dark:bg-gray-800/80 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-200 dark:border-gray-700/50 shadow-sm mx-0.5 inline-block"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    // Tables need custom wrapper for styling
                    table: ({ children }) => (
                        <div className="table-container my-4 overflow-x-auto rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
                            <table className="w-full text-sm text-left border-collapse">{children}</table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b border-gray-200/80 dark:border-gray-700/50">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/60 text-gray-800 dark:text-gray-300">
                            {children}
                        </td>
                    ),
                    // Blockquotes
                    blockquote: ({ children }) => (
                        <blockquote className="my-4 pl-4 pr-3 py-3 border-l-4 border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-gray-700 dark:text-gray-300 italic rounded-r-xl">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
};

export default SmartTextRendere;