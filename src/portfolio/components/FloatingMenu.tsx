import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
    HOME_LINK,
    ABOUT_LINK,
    SKILLS_LINK,
    PROJECTS_LINK,
    CERTIFICATIONS_LINK,
    EXPERIENCE_LINK,
    BLOG_LINK,
    CONTACT_LINK
} from "../config/config";
import {
    FaBars,
    FaTimes,
    FaUser,
    FaProjectDiagram,
    FaEnvelope,
    FaHome,
    FaTools,
    FaCertificate,
    FaBriefcase,
    FaBlog
} from "react-icons/fa";

const FloatingMenu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { to: HOME_LINK, icon: <FaHome />, label: "Home" },
        { to: ABOUT_LINK, icon: <FaUser />, label: "About" },
        { to: SKILLS_LINK, icon: <FaTools />, label: "Skills" },
        { to: PROJECTS_LINK, icon: <FaProjectDiagram />, label: "Projects" },
        { to: CERTIFICATIONS_LINK, icon: <FaCertificate />, label: "Certifications" },
        { to: EXPERIENCE_LINK, icon: <FaBriefcase />, label: "Experience" },
        { to: BLOG_LINK, icon: <FaBlog />, label: "Blog" },
        { to: CONTACT_LINK, icon: <FaEnvelope />, label: "Contact" }
    ];

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="fixed bottom-8 left-8 z-50">
            <button
                onClick={toggleMenu}
                className="bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {isMenuOpen && (
                <div className="absolute bottom-20 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 w-48">
                    {menuItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FloatingMenu;