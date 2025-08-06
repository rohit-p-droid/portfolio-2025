import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK, RESUME_LINK } from "../../config/config";
import { UseAboutSection } from "../../hooks/portfolio.hook";
import { Loader } from "../../components";

const About = () => {
  const { data: aboutData, isLoading } = UseAboutSection();

  const aboutContent = {
    title: aboutData?.title || "",
    photo: aboutData?.photo || "",
    paragraphs: aboutData?.paragraphs || [],
    experienceCount: aboutData?.experienceCount || "",
    projectsCount: aboutData?.projectsCount || "",
    technologyCount: aboutData?.technologyCount || "",
  }

  const socialLinks = [
    {
      icon: <FaGithub className="text-xl" />,
      href: GITHUB_LINK,
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-gray-200"
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      href: LINKEDIN_LINK,
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      href: EMAIL_LINK,
      label: "Email",
      color: "hover:text-red-500 dark:hover:text-red-400"
    }
  ];

  return (
    <section
      id="about"
      className="px-6 sm:px-12 py-24 bg-gradient-to-b from-cyan-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white transition-colors duration-400 relative overflow-hidden"
    >
      {isLoading && <Loader />}

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200 dark:bg-cyan-900 rounded-full opacity-10 translate-y-40 -translate-x-40"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Image section with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
            <img
              src={aboutContent.photo}
              alt="About Rohit"
              className="relative w-80 h-80 object-cover rounded-xl shadow-2xl dark:shadow-blue-800/50 border-4 border-white dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-80 flex items-center justify-center">
              <span className="text-white font-bold text-lg">💼</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2"
            >
              {aboutContent.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            ></motion.div>
          </div>

          <div className="space-y-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            {aboutContent.paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Stats or highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-4 py-6"
          >
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{aboutContent.experienceCount}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{aboutContent.projectsCount}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{aboutContent.technologyCount}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
          </motion.div>

          {/* Social links and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href={RESUME_LINK}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaDownload className="text-sm" />
              Download Resume
            </a>

            <div className="flex gap-4 ml-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                  rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  className={`p-3 rounded-full bg-white dark:bg-gray-700 shadow-md ${social.color} transition-all duration-300 text-gray-600 dark:text-gray-300`}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
