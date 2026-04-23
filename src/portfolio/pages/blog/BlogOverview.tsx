import "./BlogOverview.css";
import { motion } from "framer-motion";
import { Loader } from "../../components";
import BlogNotFound from "./BlogNotFound";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../common/utils";
import SmartTextRendere from "../../components/SmartTextRender";
import { HOME_LINK, CONTACT_LINK, BLOG_LINK } from "../../config/config";
import { FaArrowLeft, FaCalendar, FaClock, FaTags } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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

const BlogOverview = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [blogContent, setBlogContent] = useState("");
  const [blogPost, setBlogPost] = useState<BlogDetailView | null>(null);

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

  if (isLoading) return <Loader />;

  if (!isLoading && !blogPost) return <BlogNotFound />;

  if (!blogPost) return <BlogNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-black dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to={HOME_LINK}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <FaCalendar className="text-blue-500" />
              <span>Published: {formatDate(blogPost.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-green-500" />
              <span>Read Time: {blogPost.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <FaTags className="text-blue-500" />
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Content - Free content without card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-white">
            {/* Render blog content */}
            <div className={`smart-text-renderer`}>
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
                {blogContent}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>


        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 mb-8"
        >
          <Link
            to={BLOG_LINK}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-base font-medium shadow-lg"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Blogs</span>
          </Link>
          <Link
            to={CONTACT_LINK}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition-colors text-base font-medium shadow-lg"
          >
            <span>Get in Touch</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogOverview;
