// src/sections/Testimonials/Testimonials.tsx
import { testimonials } from "./testimonialData";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 dark:text-blue-400"
        >
          💬 What People Say
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-t-4 border-blue-400 dark:border-blue-600 hover:scale-105 transition-transform"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-blue-500 dark:border-blue-300 mb-4"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-4">“{t.quote}”</p>
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300">{t.name}</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
