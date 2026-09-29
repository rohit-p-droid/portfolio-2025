import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp, FaRobot } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { GITHUB_LINK, LINKEDIN_LINK, EMAIL_LINK, RESUME_LINK } from "../../config/config";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Blogs", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "").replace("/", "").replace("#", "");

        if (location.pathname === "/" || location.pathname === "") {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", href.startsWith("/#") ? href : `/#${targetId}`);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            navigate(`/#${targetId}`);
        }
    };

    return (
        <footer className="bg-gray-900 text-white px-6 sm:px-12 py-12 border-t border-gray-800">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left: Brand */}
                    <div className="text-center md:text-left space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="text-xl font-bold text-white tracking-tight">
                                Rohit Vasant Patil
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                                <FaRobot className="text-[10px]" /> AI Engineer
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Python · LangGraph · LangChain · Multi-Agents · RAG · Django · React
                        </p>
                    </div>

                    {/* Middle: Navigation */}
                    <nav className="flex flex-wrap justify-center gap-5 text-sm text-gray-400">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`/${link.href}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="hover:text-blue-400 transition-colors cursor-pointer"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right: Social & Back to Top */}
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <a
                                href={GITHUB_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                title="GitHub"
                            >
                                <FaGithub className="text-base" />
                            </a>
                            <a
                                href={LINKEDIN_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
                                title="LinkedIn"
                            >
                                <FaLinkedin className="text-base" />
                            </a>
                            <a
                                href={EMAIL_LINK}
                                className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                                title="Email"
                            >
                                <FaEnvelope className="text-base" />
                            </a>
                        </div>
                        <button
                            onClick={scrollToTop}
                            className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                            title="Back to top"
                        >
                            <FaArrowUp className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
                    <p>
                        © {new Date().getFullYear()} Rohit Patil. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href={RESUME_LINK} download className="hover:text-blue-400 transition-colors">
                            Download Resume
                        </a>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            Engineered with <FaHeart className="text-red-500" /> & React
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

