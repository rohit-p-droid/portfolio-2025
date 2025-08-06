import React from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from 'react-markdown';
import { detectTextType } from "../../utils/textType"

interface SmartTextRenderProps {
    text: string;
    className?: string;
}

const SmartTextRender: React.FC<SmartTextRenderProps> = ({ text, className = '' }) => {
    const textType = detectTextType(text);

    if (textType === "html") {
        return (
            <div
                className={className}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        );
    }

    if (textType === "markdown") {
        return (
            <div className={className}>
                <ReactMarkdown
                    children={text}
                    rehypePlugins={[rehypeRaw]}
                />
            </div>
        );
    }

    return (
        <div className={className}>
            {text}
        </div>
    );
};



export default SmartTextRender