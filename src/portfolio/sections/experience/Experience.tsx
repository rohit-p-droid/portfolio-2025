import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { experienceData as experience } from "./experienceData";
import { fadeInUp } from "../../utils/motionConfig";

const Experience = () => {
  return (
    <section
      id="experience"
      className="px-6 sm:px-12 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <motion.div
            {...fadeInUp}
            className="inline-block text-[11px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/60"
          >
            Career Milestones
          </motion.div>
          <motion.h2
            {...fadeInUp}
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center justify-center gap-2.5"
          >
            <FaBriefcase className="text-blue-600 dark:text-blue-400 text-xl" />
            Work Experience
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            2+ years of production experience designing AI agent workflows, deploying RAG systems, and collaborating directly with enterprise clients.
          </motion.p>
        </div>

        {/* Timeline */}
        {experience && (
          <div className="relative border-l-2 border-blue-200 dark:border-blue-900/60 ml-3 sm:ml-4 space-y-5">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="ml-4 sm:ml-5 relative"
              >
                {/* Timeline Dot */}
                <div className="absolute w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full -left-[23px] sm:-left-[27px] top-1.5 ring-3 ring-white dark:ring-gray-900" />

                {/* Compact Experience Card */}
                <div className="bg-gray-50/80 dark:bg-gray-800/50 p-3.5 sm:p-4 rounded-xl border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-2.5 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-200/60 dark:border-gray-700/60 pb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-500 text-[9px]" />
                        {new Date(exp.fromDate).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                        {" – "}
                        {exp.toDate
                          ? new Date(exp.toDate).toLocaleDateString(undefined, { year: "numeric", month: "short" })
                          : "Present"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-400 text-[9px]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                    {exp.description?.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-500 text-[9px] mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  {exp.techStack && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                      {exp.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
