import { motion } from "framer-motion";
import { projectsData as projects } from "./projectsData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { fadeInUp } from "../../utils/motionConfig";

const Projects = () => {
  return (
    <section
      id="projects"
      className="px-6 sm:px-12 py-20 bg-gray-50/70 dark:bg-gray-950/70 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            {...fadeInUp}
            className="inline-block text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/60"
          >
            Featured Work
          </motion.div>
          <motion.h2
            {...fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            AI & Full-Stack Projects
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Real-world applications implementing multi-agent workflows, vector search RAG systems, and performant web solutions.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {projects &&
            projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow-xs hover:shadow-lg overflow-hidden border border-gray-200/80 dark:border-gray-800 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="overflow-hidden relative h-36 sm:h-40 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category Tag Overlay */}
                    {project.tag && (
                      <div className="absolute top-2.5 left-2.5 bg-gray-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/10 shadow-xs">
                        {project.tag}
                      </div>
                    )}

                    {/* Quick Action Links */}
                    <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-10">
                      {project?.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-full text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 shadow-xs transition-all duration-200"
                          title="GitHub Repository"
                        >
                          <FaGithub className="text-xs" />
                        </a>
                      )}
                      {project?.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 hover:scale-110 shadow-xs transition-all duration-200"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 sm:p-4.5 space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Tech Tags */}
                <div className="p-4 sm:p-4.5 pt-0">
                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

