import "./BlogOverview.css";
import { motion } from "framer-motion";
import { Loader } from "../../components";
import BlogNotFound from "./BlogNotFound";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../common/utils";
import SmartTextRendere from "../../components/SmartTextRender";
import { HOME_LINK, CONTACT_LINK, BLOG_LINK } from "../../config/config";
import { FaArrowLeft, FaCalendar, FaClock, FaTags, FaShareAlt, FaCheck, FaBookmark } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import { blogsData } from "../../sections/blog/blogsData";

export interface BlogDetailView {
  title: string;
  description: string;
  content?: string;
  tags: string[];
  date: string;
  readTime: number;
  slug: string;
}

const blogModules = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
});

// Premium CodeBlock Component with high-quality VS Code aesthetic
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
    <div className="relative my-8 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700/60 shadow-xl bg-[#282c34] font-mono text-sm max-w-full group">
      {/* Code Header */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400 select-none">
        <div className="flex items-center gap-2">
          {/* Mock Window Controls */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
          </div>
          <span className="font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 transition-all shadow-sm active:scale-95 cursor-pointer font-sans text-xs"
        >
          {copied ? (
            <>
              <FaCheck className="text-green-500 animate-bounce text-[10px]" />
              <span className="text-green-600 dark:text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <pre className="p-5 m-0 overflow-x-auto bg-[#282c34] text-[#abb2bf] leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent max-h-[550px]">
        <code 
          className={`hljs language-${language} block font-mono text-[13px] md:text-sm`}
          style={{ whiteSpace: 'pre', wordSpacing: 'normal', wordBreak: 'normal' }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};

const BlogOverview = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [blogContent, setBlogContent] = useState("");
  const [blogPost, setBlogPost] = useState<BlogDetailView | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);

      const selectedBlog = blogsData.find((blog) => blog.slug === slug);

      if (!selectedBlog) {
        setBlogPost(null);
        setIsLoading(false);
        return;
      }

      setBlogPost(selectedBlog as BlogDetailView);

      try {
        const path = `./posts/${slug}.md`;
        if (blogModules[path]) {
          const content = (await blogModules[path]()) as string;
          setBlogContent(content);
        } else {
          setBlogContent("# Blog content not found\n\nThe requested blog post could not be loaded.");
        }
      } catch (error) {
        console.error("Error loading blog markdown:", error);
        setBlogContent("# Error loading blog\n\nThere was an error loading the blog content.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  if (isLoading) return <Loader />;

  if (!isLoading && !blogPost) return <BlogNotFound />;

  if (!blogPost) return <BlogNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-black dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 pb-20 select-text">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to={BLOG_LINK}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors font-medium group"
          >
            <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
            <span>Back to Blogs</span>
          </Link>
        </motion.div>

        {/* Blog Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 shadow-xl relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {blogPost.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 dark:border-gray-700/50 pb-6 mb-6">
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-blue-500 dark:text-blue-400 text-xs" />
                  <span>{formatDate(blogPost.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-green-500 dark:text-green-400 text-xs" />
                  <span>{blogPost.readTime} min read</span>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 transition-all active:scale-95 cursor-pointer text-xs font-semibold shadow-sm"
                title="Copy blog link"
              >
                {shareCopied ? (
                  <>
                    <FaCheck className="text-green-500" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <FaShareAlt />
                    <span>Share Post</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-start gap-2">
              <FaTags className="text-blue-500 dark:text-blue-400 mt-1.5 text-sm shrink-0" />
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800/40 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-white blog-article-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom code snippet styling with highlighting
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeVal = String(children).replace(/\n$/, '');
                  const isInline = !match && !codeVal.includes('\n');
                  
                  if (!isInline) {
                    return (
                      <CodeBlock 
                        code={codeVal} 
                        language={match ? match[1] : 'code'} 
                      />
                    );
                  }
                  
                  return (
                    <code 
                      className="bg-gray-100 dark:bg-gray-800/80 text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded-lg text-sm font-mono border border-gray-200 dark:border-gray-700/50 shadow-sm mx-0.5 inline-block"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                // Custom table styling
                table: ({ children }) => (
                  <div className="table-container my-8 overflow-x-auto rounded-2xl border border-gray-200/80 dark:border-gray-700/50 shadow-lg">
                    <table className="w-full text-sm text-left border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b border-gray-200/80 dark:border-gray-700/50">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/60 text-gray-800 dark:text-gray-300">
                    {children}
                  </td>
                ),
                // Custom headings with anchor layout
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800/80 pb-3">
                    <span className="w-1.5 h-6 rounded bg-blue-500"></span>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                    {children}
                  </h3>
                ),
                // Custom blockquote styling
                blockquote: ({ children }) => (
                  <blockquote className="my-8 pl-5 pr-4 py-4 border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50/40 dark:bg-blue-950/20 text-gray-700 dark:text-gray-300 italic rounded-r-2xl font-medium">
                    {children}
                  </blockquote>
                ),
                // Custom lists
                ul: ({ children }) => <ul className="list-disc pl-6 my-5 space-y-2 text-gray-800 dark:text-gray-300">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 my-5 space-y-2 text-gray-800 dark:text-gray-300">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                p: ({ children }) => <p className="leading-relaxed my-5 text-[16px] md:text-[17px] text-gray-800 dark:text-gray-300">{children}</p>,
                // Link custom designs
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 font-medium transition-colors"
                  >
                    {children}
                  </a>
                )
              }}
            >
              {blogContent}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 border-t border-gray-200/80 dark:border-gray-700/50 pt-10"
        >
          <Link
            to={BLOG_LINK}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all text-base font-semibold shadow-lg hover:shadow-blue-500/20 active:scale-95 group"
          >
            <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
            <span>Back to Blogs</span>
          </Link>
          <Link
            to={CONTACT_LINK}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all text-base font-semibold shadow-md active:scale-95"
          >
            <span>Get in Touch</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogOverview;

