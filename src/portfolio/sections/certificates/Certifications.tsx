import { motion } from "framer-motion";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { formatDate } from "../../../common/utils";
import { certificatesData as certifications } from "./certificatesData";
import { fadeInUp } from "../../utils/motionConfig";

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="px-6 sm:px-12 py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            {...fadeInUp}
            className="inline-block text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/60"
          >
            Credentials & Training
          </motion.div>
          <motion.h2
            {...fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center justify-center gap-3"
          >
            <FaCertificate className="text-blue-600 dark:text-blue-400 text-2xl" />
            Certifications
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Continuous professional learning, cybersecurity fundamentals, and industry certifications.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {certifications && certifications.length > 0 ? (
            certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-gray-50/80 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center space-y-4"
              >
                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
                    {cert.platform}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Issued {formatDate(cert.date)}
                  </p>
                </div>

                {cert?.link && (
                  <div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all duration-200"
                    >
                      <span>View Credential</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No certifications listed.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

