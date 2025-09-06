import { motion } from "framer-motion";
import { Loader } from "../../components";
import { FaCertificate } from "react-icons/fa";
import { formatDate } from "../../../common/utils";
import { UseCertificates } from "../../hooks/portfolio.hook";


const Certifications = () => {
  const { data: certifications, isLoading } = UseCertificates();

  return (
    <section
      id="certifications"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-black dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      {isLoading && <Loader />}
      <div className="max-w-6xl mx-auto text-center space-y-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-3"
        >
          <FaCertificate className="text-blue-500 dark:text-blue-400 text-3xl" /> Certifications
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications && certifications.length > 0 ? (
            certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:-translate-y-1"
              >
                {/* Platform Badge */}
                <div className="flex justify-center mb-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      {cert.platform}
                    </span>
                  </div>
                </div>

                {/* Certificate Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaCertificate className="text-2xl text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                    {cert.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {formatDate(cert.date)}
                  </p>

                  {cert?.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <span>🎓</span>
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FaCertificate className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No certifications available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
