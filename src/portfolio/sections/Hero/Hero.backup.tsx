import { motion } from "framer-motion";
import { Loader } from "../../components";
import { Typewriter } from "react-simple-typewriter";
import { UseHeroSection } from "../../hooks/portfolio.hook";
import { PROJECTS_LINK, RESUME_LINK } from "../../config/config";
import { fadeInUp, fadeIn, MOTION_CONFIG } from "../../utils/motionConfig";

const Hero = () => {
  const { data: heroSection, isLoading } = UseHeroSection();

  const heroData = {
    name: heroSection?.name || "",
    role: heroSection?.role || "",
    tagline: heroSection?.tagline || "",
    description: heroSection?.description || "",
    photo: heroSection?.photo || ""
  };

  return (
    <>
      {isLoading && <Loader />}

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-0 px-6 sm:px-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors duration-400 overflow-hidden"
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
                  words={[heroData.name || "Developer"]}
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
              {heroData.role}
            </h2>

            <p className="text-lg sm:text-xl text-cyan-700 dark:text-cyan-300">
              {heroData.tagline}
            </p>

            <p className="text-base sm:text-lg max-w-xl text-gray-700 dark:text-gray-300">
              {heroData.description}
            </p>

            <div className="flex justify-center md:justify-start gap-4 flex-wrap">
              <a
                href={PROJECTS_LINK}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-all duration-300 shadow-lg"
              >
                View Projects
              </a>
              <a
                href={RESUME_LINK}
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
            transition={{ duration: 1.2 }}
            className="relative flex justify-center"
          >
            {heroData.photo ? (
              <img
                src={heroData.photo}
                alt={heroData.name || "Profile"}
                className="w-72 h-72 rounded-full object-cover shadow-xl border-4 border-blue-600 dark:border-blue-400"
                loading="eager"
                fetchPriority="high"
                width="288"
                height="288"
              />
            ) : (
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 shadow-xl border-4 border-blue-600 dark:border-blue-400 flex items-center justify-center">
                <span className="text-white text-6xl font-bold">
                  {heroData.name?.charAt(0) || "?"}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;