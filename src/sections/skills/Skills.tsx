// src/sections/Skills/Skills.tsx
import { skills } from "./skillData";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools, FaBrain } from "react-icons/fa";

const icons = {
  Frontend: <FaCode className="text-3xl text-blue-500" />,
  Backend: <FaServer className="text-3xl text-green-500" />,
  Database: <FaDatabase className="text-3xl text-yellow-500" />,
  "Dev Tools": <FaTools className="text-3xl text-purple-500" />,
  "Learning / Focus Areas": <FaBrain className="text-3xl text-pink-500" />
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-blue-50 via-cyan-100 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-12"
        >
          My Tech Stack
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {skills.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-t-4 border-blue-600 dark:border-blue-400"
            >
              <div className="flex items-center gap-4 mb-4">
                {icons[section.category as keyof typeof icons] || null}
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
                  {section.category}
                </h3>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="bg-blue-100 dark:bg-gray-700 rounded-md px-3 py-1 text-center shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
