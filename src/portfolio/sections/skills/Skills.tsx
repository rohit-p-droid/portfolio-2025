import React from "react";
import { skills } from "./skillData";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { AiOutlineRobot, AiOutlineSafetyCertificate } from "react-icons/ai";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiSpringboot, SiDjango,
  SiMongodb, SiPostgresql, SiSqlite, SiFirebase,
  SiGit, SiGithub, SiPostman, SiDocker, SiFigma,
  SiAmazon, SiGnubash
} from "react-icons/si";

const iconMap: Record<string, React.ReactNode> = {
  "React": <SiReact className="text-cyan-500" />, "Next.js": <SiNextdotjs className="text-black dark:text-white" />, "JavaScript": <SiJavascript className="text-yellow-400" />, "TypeScript": <SiTypescript className="text-blue-600" />, "Tailwind CSS": <SiTailwindcss className="text-teal-400" />, "HTML": <SiHtml5 className="text-orange-500" />, "CSS": <SiCss3 className="text-blue-400" />,
  "Node.js": <SiNodedotjs className="text-green-600" />, "Express": <SiExpress className="text-gray-800 dark:text-gray-200" />, "Spring Boot": <SiSpringboot className="text-green-700" />, "Django": <SiDjango className="text-green-900" />, "REST APIs": <FaCode className="text-purple-500" />,
  "MongoDB": <SiMongodb className="text-green-700" />, "PostgreSQL": <SiPostgresql className="text-blue-700" />, "SQLite": <SiSqlite className="text-gray-500" />, "Firebase": <SiFirebase className="text-yellow-500" />,
  "Git": <SiGit className="text-orange-600" />, "GitHub": <SiGithub className="text-gray-900 dark:text-gray-100" />, "Postman": <SiPostman className="text-red-500" />, "VS Code": <VscCode className="text-blue-500" />, "Docker": <SiDocker className="text-blue-400" />, "Figma": <SiFigma className="text-pink-500" />,
  "AI/ML": <AiOutlineRobot className="text-indigo-500" />, "System Design": <SiGnubash className="text-gray-700" />, "Cloud (AWS)": <SiAmazon className="text-yellow-600" />, "Cybersecurity": <AiOutlineSafetyCertificate className="text-red-600" />
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 sm:px-12 px-6 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white"
        >
          My Tech Arsenal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16"
        >
          The tools and technologies I use to bring ideas to life.
        </motion.p>

        {skills.map((skillCategory, i) => (
          <motion.div
            key={skillCategory.category}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center md:text-left">
              {skillCategory.category}
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {skillCategory.items.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-32 text-center"
                >
                  <div className="text-4xl">
                    {iconMap[skill] || <FaCode className="text-purple-500" />}
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
