import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import { experienceContent as experience } from "../../services/portfolio.service";

const Experience = () => {
  return (
    <section
      id="experience"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-16 flex items-center justify-center gap-2"
        >
          <FaBriefcase className="text-blue-500 text-2xl" /> Experience
        </motion.h2>

        <div className="relative border-l-2 border-blue-400 dark:border-blue-500 ml-4">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="mb-10 ml-6 relative"
            >
              <div className="absolute w-5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full -left-[11.5px] border-4 border-white dark:border-gray-900"></div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">{exp.role}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {exp.company} — {exp.location} • {exp.period}
                </div>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;