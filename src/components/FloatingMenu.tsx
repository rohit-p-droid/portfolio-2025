import React, { useState } from "react";
import { FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

const FloatingMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Floating Menu Button */}
            <button
                onClick={toggleMenu}
                className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                aria-label="Toggle Menu"
                title="Toggle Menu"
            >
                {isMenuOpen ? "✖" : "☰"}
            </button>

            {/* Menu Items */}


            {/* Menu Items */}
            {isMenuOpen && (
                <div className="absolute bottom-24 left-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-2xl p-6 space-y-4 w-64">
                    <a
                        href="#about"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-lg font-medium"
                    >
                        <FaUser /> About
                    </a>
                    <a
                        href="#projects"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-lg font-medium"
                    >
                        <FaProjectDiagram /> Projects
                    </a>
                    <a
                        href="#contact"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-lg font-medium"
                    >
                        <FaEnvelope /> Contact
                    </a>
                </div>
            )}
        </div>
    );
};

export default FloatingMenu;