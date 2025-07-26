import { Link } from "react-router-dom";
import { BLOG_LINK } from "../../config/config";
import { Certifications as CertificationSection } from "../../sections";

const Certifications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-black dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex flex-col justify-between">
      <div>
        <div className="max-w-4xl mx-auto pt-16 pb-8 px-4 text-center">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center justify-center gap-2">
            <span role="img" aria-label="certificate">🎓</span> My Certifications
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">A showcase of my professional certifications and achievements.</p>
        </div>
        <CertificationSection />
      </div>
      <div className="w-full flex justify-center py-8">
        <Link
          to={BLOG_LINK}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-all duration-200 border-2 border-blue-200 dark:border-blue-700"
        >
          <span role="img" aria-label="blog" className="text-2xl">📝</span>
          <span>Read My Blogs</span>
        </Link>
      </div>
    </div>
  );
};

export default Certifications;