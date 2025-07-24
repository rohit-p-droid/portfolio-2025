// src/sections/Footer/Footer.tsx
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-blue-100 via-cyan-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-700 dark:text-gray-300 px-6 sm:px-12 py-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left: Name/Logo */}
                <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                    Rohit Patil
                </div>

                {/* Middle: Nav Links */}
                <ul className="flex flex-wrap gap-4 text-sm sm:text-base font-medium">
                    <li><a href="#hero" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Home</a></li>
                    <li><a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Projects</a></li>
                    <li><a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Skills</a></li>
                    <li><a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Contact</a></li>
                </ul>

                {/* Right: Social Icons */}
                <div className="flex gap-4 text-xl">
                    <a href="https://github.com/your-username" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-300 transition">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/your-profile" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-300 transition">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:your-email@example.com" className="hover:text-blue-600 dark:hover:text-blue-300 transition">
                        <FaEnvelope />
                    </a>
                </div>
            </div>

            <div className="text-center text-xs mt-6 text-gray-500 dark:text-gray-500">
                Designed and developed with ❤️ by Rohit Patil
            </div>
        </footer>
    );
};

export default Footer;
