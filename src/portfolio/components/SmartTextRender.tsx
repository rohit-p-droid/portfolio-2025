import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './SmartTextRenderer.css';

interface SmartTextRendererProps {
    text: string;
    className?: string;
}

const SmartTextRendere: React.FC<SmartTextRendererProps> = ({
    text,
    className = ''
}) => {
    const detectContentType = (content: string): 'html' | 'markdown' | 'plain' => {
        if (!content || content.trim() === '') return 'plain';

        const htmlRegex = /<\/?[a-z][\s\S]*>/i;
        if (htmlRegex.test(content)) {
            return 'html';
        }

        const markdownPatterns = [
            /^#{1,6}\s+/m,        // Headers
            /\*\*.*?\*\*/,        // Bold
            /\*.*?\*/,            // Italic
            /\[.*?\]\(.*?\)/,     // Links
            /```[\s\S]*?```/,     // Code blocks
            /`.*?`/,              // Inline code
            /^\* /m,              // Unordered list
            /^\d+\. /m,           // Ordered list
            /^> /m,               // Blockquotes
            /!\[.*?\]\(.*?\)/,    // Images
            /^\|.*\|.*\|/m,       // Tables
            /---+/,               // Horizontal rules
            /~~.*?~~/             // Strikethrough
        ];

        const hasMarkdown = markdownPatterns.some(pattern => pattern.test(content));
        return hasMarkdown ? 'markdown' : 'plain';
    };

    const contentType = detectContentType(text);

    const renderContent = () => {
        switch (contentType) {
            case 'html':
                return (
                    <div className={`smart-text-html ${className}`}>
                        <div dangerouslySetInnerHTML={{ __html: text }} />
                    </div>
                );

            case 'markdown':
                return (
                    <div className={`smart-text-renderer ${className}`}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                // Tables need custom wrapper for styling
                                table: ({ children }) => (
                                    <div className="table-container">
                                        <table>{children}</table>
                                    </div>
                                ),
                            }}
                        >
                            {text}
                        </ReactMarkdown>
                    </div>
                );

            case 'plain':
            default:
                return (
                    <div className={`smart-text-plain ${className}`}>
                        {text.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < text.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </div>
                );
        }
    };

    return <>{renderContent()}</>;
};

export default SmartTextRendere;