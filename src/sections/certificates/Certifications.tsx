// src/sections/Certifications/Certifications.tsx
import { certifications } from "./certificationsData";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center space-y-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-3"
        >
          <FaCertificate className="text-blue-500 dark:text-blue-400 text-3xl" /> Certifications
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-white dark:bg-gray-800 p-6 pt-12 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-shadow overflow-hidden"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center border border-blue-300 dark:border-blue-500 overflow-hidden">
                <img
                  src={cert.logo}
                  alt={`${cert.platform} logo`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cert.platform} • {cert.date}</p>
                <a
                  href={cert.link}
                  target="_blank"
                  className="inline-block mt-4 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition"
                >
                  🎓 View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
