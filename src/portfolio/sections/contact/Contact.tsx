import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-cyan-50 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2"
        >
          💬 Let’s Talk!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg"
        >
          Whether you want to discuss a project, a job opportunity, or just geek out about tech — my inbox is always open! 🚀
        </motion.p>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-base sm:text-lg text-gray-800 dark:text-gray-200"
        >
          <a href="mailto:your-email@example.com" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
            <FaEnvelope /> your-email@example.com
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://github.com/your-username" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
            <FaGithub /> GitHub
          </a>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow">
            <FaMapMarkerAlt /> India
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl text-left space-y-6 max-w-2xl mx-auto border border-blue-100 dark:border-blue-700"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Message</label>
            <textarea rows={5} className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"></textarea>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
            <FaPaperPlane className="text-white" /> Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
