import { Hero } from "../../sections";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaProjectDiagram,
  FaBlog,
} from "react-icons/fa";
import { PROJECTS_LINK, BLOG_LINK } from "../../config/config";

const cards = [
  {
    title: "My Work",
    description: "Explore a collection of my projects, showcasing my skills in creating modern, scalable web applications.",
    icon: <FaProjectDiagram />,
    link: PROJECTS_LINK,
    cta: "View Projects",
  },
  {
    title: "My Blog",
    description: "I write about web development, system design, and the latest technologies I'm excited about.",
    icon: <FaBlog />,
    link: BLOG_LINK,
    cta: "Read Blog",
  },
];

const Homepage = () => {
  return (
    <>
      <Hero />

      {/* Intro / Mission */}
      <section className="text-center py-16 px-6 sm:px-12 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Building intelligent, elegant, and efficient web solutions.
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          I’m a full-stack engineer with expertise in React, NestJS, Django, and system design.
          My mission? <i><b>- Craft digital products that users love — fast, scalable, and future-ready.</b></i>
        </p>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6 sm:px-12 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-lg overflow-hidden group transition-all duration-300"
            >
              <div className="p-8">
                <div className="text-4xl text-blue-500 dark:text-blue-400 mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{card.description}</p>
                <Link
                  to={card.link}
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 group-hover:shadow-lg"
                >
                  {card.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Homepage;
