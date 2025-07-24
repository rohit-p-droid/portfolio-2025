import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { GITHUB_LINK, LINKEDIN_LINK, EMAIL_LINK } from "../../config/config";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-blue-100 via-cyan-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-700 dark:text-gray-300 px-6 sm:px-12 py-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left: Name/Logo */}
                <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                    <Link to="/">
                        Rohit Patil
                    </Link>
                </div>

                {/* Middle: Nav Links */}
                <ul className="flex flex-wrap gap-4 text-sm sm:text-base font-medium">
                    <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Home</Link></li>
                    <li><Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Projects</Link></li>
                    <li><Link to="/skills" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Skills</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Contact</Link></li>
                </ul>

                {/* Right: Social Icons */}
                <div className="flex gap-4 text-xl">
                    <Link to={GITHUB_LINK} target="_blank" className="hover:text-blue-600 dark:hover:text-blue-300 transition">
                        <FaGithub />
                    </Link>
                    <Link to={LINKEDIN_LINK} target="_blank" className="hover:text-blue-600 dark:hover:text-blue-300 transition">
                        <FaLinkedin />
                    </Link>
                    <Link to={EMAIL_LINK} className="hover:text-blue-600 dark:hover:text-blue-300 transition">
                        <FaEnvelope />
                    </Link>
                </div>
            </div>

            <div className="text-center text-xs mt-6 text-gray-500 dark:text-gray-500">
                Designed and developed with ❤️ by Rohit Patil
            </div>
        </footer>
    );
};

export default Footer;
