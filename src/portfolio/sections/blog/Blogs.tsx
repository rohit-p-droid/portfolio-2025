import { motion, AnimatePresence } from "framer-motion";
import { BLOG_LINK } from "../../config/config";
import { formatDate } from "../../../common/utils";
import { blogsData as blogPosts } from "./blogsData";
import { FaPenNib, FaCalendarAlt, FaClock, FaSearch, FaTimes, FaInbox } from "react-icons/fa";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Get all unique tags from blog posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
    return ["All", ...Array.from(tagsSet)];
  }, []);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <section
      id="blog"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300 min-h-[80vh]"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-3"
          >
            <FaPenNib className="text-blue-500 dark:text-blue-300 text-2xl" /> 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Blogs</span>
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Exploring backend engineering, SaaS architectures, cloud computing, and full-stack development best practices.
          </p>
        </div>

        {/* Search and Tag Filters Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Input Box */}
          <div className="relative max-w-xl mx-auto group">
            {/* Soft background gradient glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-300 pointer-events-none" />
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 dark:text-gray-500">
                <FaSearch className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles by title, description or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all text-sm md:text-base shadow-sm focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Tags Scroll Menu */}
          <div className="relative py-2 border-t border-b border-gray-200/60 dark:border-gray-800/80">
            <div className="flex items-center gap-3 w-full min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 select-none shrink-0">Tags:</span>
              <div className="flex-1 flex overflow-x-auto scrollbar-none gap-2 py-1 select-none min-w-0">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 ${
                      selectedTag === tag
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md shadow-blue-500/25"
                        : "bg-gray-100 dark:bg-gray-800/60 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    {tag === "All" ? "All Articles" : `#${tag}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div 
          layout 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between h-full bg-white/70 dark:bg-gray-900/40 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 dark:border-gray-800/60 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-md hover:shadow-xl dark:shadow-none transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative hover gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-4 relative">
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className={`px-2 py-0.5 rounded-md font-semibold border transition-all cursor-pointer ${
                          selectedTag === tag 
                            ? "bg-blue-500 text-white border-transparent"
                            : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800/60 flex flex-col justify-between relative gap-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-blue-500 dark:text-blue-400" />
                      <span>{formatDate(post.date)}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <FaClock className="text-green-500 dark:text-green-400" />
                      <span>{post.readTime} min read</span>
                    </span>
                  </div>

                  <Link
                    to={`${BLOG_LINK}/${post.slug}`}
                    className="flex items-center justify-center gap-1.5 text-sm py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer text-center group"
                  >
                    <span>Read Article</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto bg-white/70 dark:bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/60 shadow-md my-8"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 dark:text-blue-400 text-2xl mb-4">
              <FaInbox />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any articles matching "{searchQuery}" {selectedTag !== "All" && `in tag #${selectedTag}`}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer shadow-md hover:shadow-blue-500/20"
            >
              Clear Search & Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
