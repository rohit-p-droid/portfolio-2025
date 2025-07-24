import { aboutContent } from "./aboutData";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="px-6 sm:px-12 py-24 bg-gradient-to-b from-cyan-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image or illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center md:justify-start"
        >
          <img
            src="/assets/rohit.jpg"
            alt="About Rohit"
            className="w-80 h-auto rounded-xl shadow-xl dark:shadow-blue-800"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400">
            {aboutContent.title}
          </h2>

          <div className="space-y-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            {aboutContent.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="pt-6">
            <a
              href="#projects"
              className="inline-block px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Explore My Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
