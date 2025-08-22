import { motion } from "framer-motion";
import { Loader } from "../../components";
import { FaPenNib, FaCalendarAlt, FaClock } from "react-icons/fa";
import { BLOG_LINK } from "../../config/config";
import { UseBlogList } from "../../hooks/blog.hook";
import { formatDate } from "../../../common/utils";

const Blog = () => {
  
  const {data: blogPosts, isLoading} = UseBlogList();
  
  return (
    <section
      id="blog"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      {isLoading && <Loader/>}
      <div className="max-w-6xl mx-auto text-center space-y-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-3"
        >
          <FaPenNib className="text-blue-500 dark:text-blue-300 text-2xl" /> Blogs
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts?.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-700 hover:scale-[1.02] transition-transform"
            >
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{post.description}</p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-blue-500 dark:text-blue-400" />
                    <span>Published: {formatDate(post.date)}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <FaClock className="text-green-500 dark:text-green-400" />
                    <span>Read Time: {post.readTime}</span>
                  </span>
                </div>

                <a
                  href={`${BLOG_LINK}/${post.slug}`}
                  className="mt-5 inline-block text-sm px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:scale-105 transition-transform"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
