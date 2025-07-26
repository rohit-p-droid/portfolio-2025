import { About as AboutSection } from "../../sections"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaProjectDiagram, FaTools, FaBriefcase, FaCertificate, FaBlog, FaEnvelope, FaArrowRight } from "react-icons/fa"
import { CONTACT_LINK, PROJECTS_LINK } from "../../config/config"

const sectionCards = [
  {
    title: "My Projects",
    description: "Explore a collection of my featured projects showcasing modern web development skills and innovative solutions.",
    icon: <FaProjectDiagram className="text-3xl text-blue-500" />,
    link: "/projects",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-700"
  },
  {
    title: "Skills & Tech Stack",
    description: "Discover the technologies, frameworks, and tools I use to build scalable and efficient applications.",
    icon: <FaTools className="text-3xl text-green-500" />,
    link: "/skills",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-700"
  },
  {
    title: "Work Experience",
    description: "Learn about my professional journey, roles, and the valuable experience I've gained in the industry.",
    icon: <FaBriefcase className="text-3xl text-purple-500" />,
    link: "/experience",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-700"
  },
  {
    title: "Certifications",
    description: "View my professional certifications and continuous learning achievements in various technologies.",
    icon: <FaCertificate className="text-3xl text-orange-500" />,
    link: "/certifications",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-700"
  },
  {
    title: "Blog & Articles",
    description: "Read my thoughts on web development, system design, and the latest technologies I'm exploring.",
    icon: <FaBlog className="text-3xl text-indigo-500" />,
    link: "/blog",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-700"
  },
  {
    title: "Get In Touch",
    description: "Interested in collaborating? Let's discuss your project ideas and how we can work together.",
    icon: <FaEnvelope className="text-3xl text-pink-500" />,
    link: "/contact",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    borderColor: "border-pink-200 dark:border-pink-700"
  }
]

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* About Section */}
      <AboutSection />
      
      {/* Enhanced Navigation Section */}
      <section className="px-6 sm:px-12 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Explore More About My Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dive deeper into my professional world. Discover my projects, skills, experience, and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectionCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link
                  to={card.link}
                  className={`block h-full p-6 rounded-2xl border-2 ${card.borderColor} ${card.bgColor} hover:shadow-xl transition-all duration-300 transform hover:border-opacity-80`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} bg-opacity-10 mr-4`}>
                        {card.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      <span className="mr-2">Learn More</span>
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 sm:px-12 py-16 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Start a Project Together?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            I'm always excited to work on new challenges and bring innovative ideas to life. 
            Let's discuss how we can collaborate!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={CONTACT_LINK}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get In Touch
            </Link>
            <Link
              to={PROJECTS_LINK}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300"
            >
              View My Work
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default About