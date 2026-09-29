import { heroData } from "./heroData";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { RESUME_LINK, GITHUB_LINK, LINKEDIN_LINK, EMAIL_LINK } from "../../config/config";
import { fadeInUp, fadeIn, MOTION_CONFIG } from "../../utils/motionConfig";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaArrowDown, FaRobot, FaBolt } from "react-icons/fa";

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 sm:px-12 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden"
        >
            {/* Background Glow Accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-6xl w-full grid md:grid-cols-12 gap-10 items-center">
                {/* Text Section */}
                <div className="md:col-span-7 space-y-6 text-center md:text-left">
                    {/* Status Pill */}
                    <motion.div
                        {...fadeInUp}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <FaRobot className="text-blue-600 dark:text-blue-400" />
                        <span>AI Engineer • GenAI · Agentic AI · RAG · Full-Stack</span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-3">
                        <motion.h1
                            {...fadeInUp}
                            transition={{ delay: 0.1, duration: MOTION_CONFIG.duration.fast }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
                        >
                            Hi, I'm{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                                {heroData.name}
                            </span>
                        </motion.h1>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.15, duration: MOTION_CONFIG.duration.fast }}
                            className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200 flex flex-wrap items-center gap-2 justify-center md:justify-start min-h-[2rem]"
                        >
                            <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                                AI Engineer
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 font-normal">|</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                <Typewriter
                                    words={[
                                        "Agentic AI & Multi-Agent Workflows",
                                        "Production RAG & Vector Search",
                                        "LangGraph & OpenAI Systems",
                                        "Voice AI & MCP Integrations",
                                        "Scalable Full-Stack AI Apps"
                                    ]}
                                    loop={true}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={60}
                                    deleteSpeed={40}
                                    delaySpeed={1500}
                                />
                            </span>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.25, duration: MOTION_CONFIG.duration.fast }}
                        className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
                    >
                        {heroData.description}
                    </motion.p>

                    {/* Tech Highlights Pills */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.35, duration: MOTION_CONFIG.duration.fast }}
                        className="flex flex-wrap gap-2 justify-center md:justify-start"
                    >
                        {heroData.skillsPills?.map((pill, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm"
                            >
                                <FaBolt className="text-blue-500 text-[10px]" />
                                {pill}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA Actions */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.45, duration: MOTION_CONFIG.duration.fast }}
                        className="flex items-center justify-center md:justify-start gap-4 flex-wrap pt-2"
                    >
                        <a
                            href="#projects"
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-blue-500/25 hover:shadow-lg flex items-center gap-2"
                        >
                            <span>Explore Projects</span>
                            <FaArrowDown className="text-xs" />
                        </a>

                        <a
                            href={RESUME_LINK}
                            download
                            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/80 font-semibold transition-all duration-200 shadow-sm flex items-center gap-2"
                        >
                            <FaFileDownload className="text-blue-600 dark:text-blue-400" />
                            <span>Resume</span>
                        </a>

                        {/* Social Mini Icons */}
                        <div className="flex items-center gap-2 pl-2">
                            <a
                                href={GITHUB_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all shadow-sm"
                                title="GitHub"
                            >
                                <FaGithub className="text-lg" />
                            </a>
                            <a
                                href={LINKEDIN_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all shadow-sm"
                                title="LinkedIn"
                            >
                                <FaLinkedin className="text-lg" />
                            </a>
                            <a
                                href={EMAIL_LINK}
                                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-110 transition-all shadow-sm"
                                title="Email"
                            >
                                <FaEnvelope className="text-lg" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Profile Photo Section */}
                <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.4, duration: MOTION_CONFIG.duration.normal }}
                    className="md:col-span-5 flex justify-center"
                >
                    <div className="relative group">
                        {/* Glowing backdrop halo */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity duration-500"></div>

                        <div className="relative p-2 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/80 dark:border-gray-700/80 shadow-2xl">
                            <img
                                src={heroData.photo}
                                alt={heroData.name}
                                className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-inner group-hover:scale-[1.02] transition-transform duration-300"
                                loading="eager"
                                fetchPriority="high"
                                width="288"
                                height="288"
                            />

                            {/* Floating stat card overlay */}
                            <div className="absolute -bottom-4 -left-4 px-4 py-2.5 bg-white dark:bg-gray-900/95 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                    <FaRobot className="text-lg" />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Experience</div>
                                    <div className="text-sm font-bold text-gray-900 dark:text-white">2+ Years Production AI & Full-Stack</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

