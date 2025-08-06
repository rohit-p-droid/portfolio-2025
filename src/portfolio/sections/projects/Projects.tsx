import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Loader } from "../../components";
import { UseProjects } from "../../hooks/project.hook";

const Projects = () => {
  const { data: projects, isLoading } = UseProjects();
  console.log(projects)
  return (
    <section
      id="projects"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      {isLoading && <Loader />}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-16"
        >
          🚀 Featured Projects
        </motion.h2>

        <div className="grid gap-14 md:grid-cols-2">
          {projects &&
            <>
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300"
                >
                  <div className="overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-3 z-10">
                      {project?.github && <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-gray-700 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition"
                        title="GitHub Repository"
                      >
                        <FaGithub className="text-lg" />
                      </a>}
                      {project?.live && <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 dark:bg-blue-500 p-2 rounded-full text-white hover:bg-blue-700 dark:hover:bg-blue-400 hover:shadow-md transition"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                      </a>}
                    </div>
                  </div>

                  <div className="p-6 text-left space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default Projects;
