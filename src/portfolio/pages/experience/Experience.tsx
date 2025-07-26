import { Link } from "react-router-dom";
import { SKILLS_LINK, BLOG_LINK } from "../../config/config";
import { Experience as ExperienceSection } from "../../sections";

const Experience = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-black dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex flex-col justify-between">
      <div className="flex-1">
        <ExperienceSection />
      </div>
      <div className="w-full flex justify-center gap-6 pb-8">
        <Link
          to={SKILLS_LINK}
          className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 w-48"
        >
          <div className="text-center">
            <div className="text-3xl mb-3">🛠️</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skills</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Explore my technical expertise</p>
          </div>
        </Link>
        <Link
          to={BLOG_LINK}
          className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 w-48"
        >
          <div className="text-center">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Blogs</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Read my latest thoughts</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Experience;