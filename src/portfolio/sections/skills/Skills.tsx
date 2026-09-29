import { motion } from "framer-motion";
import { skillsData as skills } from "./skillsData";
import { fadeInUp } from "../../utils/motionConfig";

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.06,
            duration: 0.35,
        },
    }),
};

const Skills = () => {
    return (
        <section
            id="skills"
            className="py-14 sm:px-12 px-6 bg-gray-50/70 dark:bg-gray-950/70 transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-2">
                    <motion.div
                        {...fadeInUp}
                        className="inline-block text-[10px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/60"
                    >
                        Technical Arsenal
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight"
                    >
                        Skills & Tech Stack
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
                    >
                        Production-proven tools and frameworks across AI, backend microservices, and full-stack systems.
                    </motion.p>
                </div>

                {/* Compact Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {skills.map((skillCategory, i) => (
                        <motion.div
                            key={skillCategory.category}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="bg-white dark:bg-gray-900 p-3.5 sm:p-4 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-200 flex flex-col justify-between"
                        >
                            <div className="space-y-2.5">
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                                        {skillCategory.category}
                                    </h3>
                                    {skillCategory.description && (
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                            {skillCategory.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {skillCategory.items.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 dark:bg-gray-800/80 rounded-md border border-gray-200/60 dark:border-gray-700/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors"
                                        >
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-3.5 h-3.5 object-contain"
                                                loading="lazy"
                                            />
                                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {skill.name}
                                            </span>
                                        </div>
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

export default Skills;


