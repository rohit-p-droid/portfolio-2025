import { motion } from "framer-motion";
import { heroContent } from "./heroData";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors duration-400 overflow-hidden"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Hi, I’m{" "}
            <span className="text-blue-700 dark:text-blue-400">
              <Typewriter
                words={[heroContent.name]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.h1>

          <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 dark:text-green-300">
            {heroContent.role}
          </h2>

          <p className="text-lg sm:text-xl text-cyan-700 dark:text-cyan-300">
            {heroContent.tagline}
          </p>

          <p className="text-base sm:text-lg max-w-xl text-gray-700 dark:text-gray-300">
            {heroContent.description}
          </p>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <a
              href={heroContent.projectsLink}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-all duration-300 shadow-lg"
            >
              View Projects
            </a>
            <a
              href={heroContent.resumeLink}
              download
              className="px-6 py-3 rounded-full border border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 hover:text-white dark:hover:from-blue-400 dark:hover:to-blue-500 dark:hover:text-black transition-all duration-300"
            >
              Download Resume
            </a>
          </div>

        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="relative flex justify-center"
        >
          <img
            src={heroContent.photo}
            alt="Rohit Patil"
            className="w-72 h-72 rounded-full object-cover shadow-xl border-4 border-blue-600 dark:border-blue-400"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;