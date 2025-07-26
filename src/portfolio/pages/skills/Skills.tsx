import { Link } from "react-router-dom";
import SkillsSection from "../../sections/skills/Skills";
import { PROJECTS_LINK, BLOG_LINK } from "../../config/config";

const Skills = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SkillsSection />

      {/* Redirect Cards Section */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pb-20 px-6">
        <Link
          to={PROJECTS_LINK}
          className="block bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-lg p-8 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:scale-105"
        >
          <div className="text-2xl mb-3 font-bold">My Work</div>
          <div className="text-base mb-2 text-gray-700 dark:text-gray-300">Explore a collection of my projects, showcasing my skills in creating modern, scalable web applications.</div>
          <span className="inline-block mt-4 text-sm underline underline-offset-4 font-semibold text-blue-600 dark:text-blue-400">View Projects →</span>
        </Link>
        <Link
          to={BLOG_LINK}
          className="block bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-lg p-8 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:scale-105"
        >
          <div className="text-2xl mb-3 font-bold">My Blog</div>
          <div className="text-base mb-2 text-gray-700 dark:text-gray-300">I write about web development, system design, and the latest technologies I'm excited about.</div>
          <span className="inline-block mt-4 text-sm underline underline-offset-4 font-semibold text-blue-600 dark:text-blue-400">Read Blog →</span>
        </Link>
      </div>
    </div>
  );
};

export default Skills;