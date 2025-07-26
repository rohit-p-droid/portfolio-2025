import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HOME_LINK, BLOG_LINK } from "../../config/config";


const BlogNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-black dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto px-6"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="text-9xl mb-8"
          >
            🔍
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Oops! Blog Not Found
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
          >
            The blog post you're looking for seems to have wandered off into the digital void. 
            Don't worry, let's get you back on track with some great alternatives!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link 
              to={HOME_LINK}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold flex items-center justify-center gap-3 text-lg"
            >
              <motion.span 
                className="text-2xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                🏠
              </motion.span>
              <span>Back to Home</span>
            </Link>
            
            <Link 
              to={BLOG_LINK}
              className="group relative px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold flex items-center justify-center gap-3 text-lg border-2 border-gray-200 dark:border-gray-600"
            >
              <motion.span 
                className="text-2xl"
                whileHover={{ scale: 1.2, rotate: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                📚
              </motion.span>
              <span>Browse All Blogs</span>
            </Link>
          </motion.div>

          {/* Suggested Topics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="text-base text-gray-500 dark:text-gray-400 mb-6 font-medium"
            >
              ✨ Maybe you're interested in these popular topics?
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "TypeScript", "Web Development", "UI/UX", "JavaScript", "CSS"].map((topic, index) => (
                <motion.button
                  key={topic}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800 transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700"
                >
                  #{topic}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-gray-400 p-5 dark:text-gray-500 italic">
              "Every great developer has been lost in documentation at least once! 😄
            </p>
          </motion.div>
        </motion.div>
      </div>
  )
}

export default BlogNotFound