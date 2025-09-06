import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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
            /^#{1,6}\s+/m,
            /\*\*.*?\*\*/,
            /\*.*?\*/,
            /\[.*?\]\(.*?\)/,
            /```[\s\S]*?```/,
            /`.*?`/,
            /^\* /m,
            /^\d+\. /m,
            /^> /m,
            /!\[.*?\]\(.*?\)/,
            /^\|.*\|.*\|/m,
            /---+/,
            /~~.*?~~/
        ];

        const hasMarkdown = markdownPatterns.some(pattern => pattern.test(content));
        return hasMarkdown ? 'markdown' : 'plain';
    };

    const contentType = detectContentType(text);

    const renderContent = () => {
        switch (contentType) {
            case 'html':
                return (

                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: text }}
                            className={`${className}`}
                        />
                    </div>
                );

            case 'markdown':
                return (
                    <div className={`${className}`}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {text}
                        </ReactMarkdown>
                    </div>
                );

            case 'plain':
            default:
                return (
                    <div className={`whitespace-pre-wrap ${className}`}>
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