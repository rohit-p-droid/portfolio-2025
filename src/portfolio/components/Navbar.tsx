import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaRobot, FaFileDownload, FaSun, FaMoon } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { RESUME_LINK } from "../config/config";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Blogs", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection on home page
      if (location.pathname === "/" || location.pathname === "") {
        const sections = ["hero", "about", "skills", "experience", "projects", "certifications", "blog", "contact"];
        const scrollPosition = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      } else {
        setActiveSection("blog");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

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
    setMobileMenuOpen(false);
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/" || location.pathname === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/#hero");
    } else {
      navigate("/#hero");
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/60 dark:border-gray-800/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand */}
        <a href="/#hero" onClick={handleBrandClick} className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            RP
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-white tracking-tight text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Rohit Patil
            </span>
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 uppercase tracking-wider">
              <FaRobot className="text-[9px]" /> AI Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-gray-800/60 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isHome = location.pathname === "/" || location.pathname === "";
            const isActive = isHome ? activeSection === link.href.substring(1) : link.href === "#blog";
            return (
              <a
                key={link.name}
                href={`/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-xs"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Resume CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition cursor-pointer"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? <FaMoon className="text-sm" /> : <FaSun className="text-sm text-yellow-400" />}
          </button>

          <a
            href={RESUME_LINK}
            download
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all duration-200"
          >
            <FaFileDownload className="text-xs" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle & Theme Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon className="text-sm" /> : <FaSun className="text-sm text-yellow-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 cursor-pointer"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 shadow-xl space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <a
              href={RESUME_LINK}
              download
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-xs"
            >
              <FaFileDownload /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
