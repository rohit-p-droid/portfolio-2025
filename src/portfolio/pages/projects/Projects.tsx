
import { Projects as ProjectSection } from "../../sections"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaTools, FaEnvelope, FaArrowRight } from "react-icons/fa"
import { SKILLS_LINK, BLOG_LINK } from "../../config/config"

const quickLinks = [
  {
    title: "My Skills & Tech Stack",
    description: "Explore the technologies and frameworks I use to build these projects.",
    icon: <FaTools className="text-2xl text-green-500" />,
    link: SKILLS_LINK,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-700"
  },
  {
    title: "Read My Blog",
    description: "Dive into articles on web development, system design, and more insights from my journey.",
    icon: <FaEnvelope className="text-2xl text-blue-500" />,
    link: BLOG_LINK,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-700"
  }
]

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Projects List Section */}
         <ProjectSection />

      {/* Quick Links Section */}
      <section className="px-4 sm:px-10 pb-20">
        <div className="max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Where to Next?</h3>
            <p className="text-gray-600 dark:text-gray-300">Check out my skills or get in touch for collaboration.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickLinks.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`group border-2 ${item.borderColor} ${item.bgColor} rounded-2xl p-6 flex flex-col items-center shadow hover:shadow-xl transition-all duration-300`}
              >
                <div className={`mb-4 p-3 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10`}>{item.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{item.description}</p>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                >
                  <span>Explore</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
