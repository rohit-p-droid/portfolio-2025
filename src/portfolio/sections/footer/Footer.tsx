import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from "react-icons/fa";
import { GITHUB_LINK, LINKEDIN_LINK, EMAIL_LINK, HOME_LINK, PROJECTS_LINK, SKILLS_LINK, CONTACT_LINK, BLOG_LINK } from "../../config/config";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gray-800 ext-white px-6 sm:px-12 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    {/* Left: Brand */}
                    <div className="text-center md:text-left">
                        <Link to={HOME_LINK} className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                            Rohit Patil
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">Full-stack Engineer</p>
                    </div>

                    {/* Middle: Navigation */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <Link to={HOME_LINK} className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link>
                        <Link to={PROJECTS_LINK} className="text-gray-300 hover:text-blue-400 transition-colors">Projects</Link>
                        <Link to={SKILLS_LINK} className="text-gray-300 hover:text-blue-400 transition-colors">Skills</Link>
                        <Link to={BLOG_LINK} className="text-gray-300 hover:text-blue-400 transition-colors">Blog</Link>
                        <Link to={CONTACT_LINK} className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link>
                    </div>

                    {/* Right: Social & Back to Top */}
                    <div className="flex items-center gap-4">
                        <div className="flex gap-3">
                            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" 
                               className="text-gray-400 hover:text-blue-400 transition-colors">
                                <FaGithub />
                            </a>
                            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer"
                               className="text-gray-400 hover:text-blue-400 transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href={EMAIL_LINK}
                               className="text-gray-400 hover:text-blue-400 transition-colors">
                                <FaEnvelope />
                            </a>
                        </div>
                        <button 
                            onClick={scrollToTop}
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            title="Back to top"
                        >
                            <FaArrowUp />
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400 text-xs flex items-center gap-1 justify-center">
                        © 2025 Rohit Patil. Made with <FaHeart className="text-red-500" /> 
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
