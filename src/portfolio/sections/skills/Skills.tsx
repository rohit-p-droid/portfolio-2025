import { motion } from "framer-motion";
import { UseSkills } from "../../hooks/portfolio.hook";
import { Loader } from "../../components";
import { fadeInUp, simpleHover, MOTION_CONFIG } from "../../utils/motionConfig";

const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05, // Reduced delay
            duration: MOTION_CONFIG.duration.fast,
        },
    }),
};

const Skills = () => {
    const { data: skills, isLoading, isError } = UseSkills();

    if (isLoading) {
        return (
            <section className="py-24 sm:px-12 px-6 bg-gray-50 dark:bg-gray-800">
                <Loader />
            </section>
        );
    }

    if (isError || !skills) {
        return (
            <section className="py-24 sm:px-12 px-6 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-600 dark:text-red-400">
                        Error loading skills data
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            id="skills"
            className="py-24 sm:px-12 px-6 bg-gray-50 dark:bg-gray-800"
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white"
                >
                    My Tech Arsenal
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16"
                >
                    The tools and technologies I use to bring ideas to life.
                </motion.p>

                {skills.map((skillCategory, i) => (
                    <motion.div
                        key={skillCategory.category}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mb-12"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center md:text-left">
                            {skillCategory.category}
                        </h3>
                        <div className="flex flex-wrap justify-start gap-6 md:ml-45">
                            {skillCategory.items.map((skill) => {
                                // Process SVG to ensure proper sizing
                                const processedIcon = skill.icon
                                    .replace(/width="[^"]*"/g, 'width="48"')
                                    .replace(/height="[^"]*"/g, 'height="48"')
                                    .replace(/className="[^"]*"/g, 'className="w-12 h-12"');

                                return (
                                    <motion.div
                                        key={skill.name}
                                        whileHover={simpleHover}
                                        className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-32 text-center border border-gray-200 dark:border-gray-600"
                                    >
                                        <div
                                            className="w-12 h-12 flex items-center justify-center overflow-hidden"
                                            dangerouslySetInnerHTML={{ __html: processedIcon }}
                                        />
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
