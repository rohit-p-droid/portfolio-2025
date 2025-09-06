import "./BlogOverview.css";
import { motion } from "framer-motion";
import BlogNotFound from "./BlogNotFound";
import { Link, useParams } from "react-router-dom";
import { HOME_LINK, CONTACT_LINK, BLOG_LINK } from "../../config/config";
import { FaArrowLeft, FaCalendar, FaClock, FaTags } from "react-icons/fa";
import { formatDate } from "../../../common/utils";

import { Loader } from "../../components";
import { UseBlogDetail } from "../../hooks/blog.hook";
import SmartTextRendere from "../../components/SmartTextRender";

const BlogOverview = () => {
  const { slug } = useParams();
  const { data: blogPost, isLoading } = UseBlogDetail(slug);
  // const relatedBlogs: any = [];

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !blogPost) {
    return <BlogNotFound />;
  }

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
            <SmartTextRendere
              text={blogPost.content}
              className="blog-content"
            />
          </div>
        </motion.div>

        {/* Related Blogs */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedBlogs?.map((relatedBlog: any) => (
              <Link
                key={relatedBlog.id}
                to={`/blog/${relatedBlog.id}`}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {relatedBlog.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {relatedBlog.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>📅 {formatDate(relatedBlog.date)}</span>
                  <span>⏱️ {relatedBlog.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div> */}

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
