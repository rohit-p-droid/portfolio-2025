import React from 'react'
import { GiLightBulb } from 'react-icons/gi'

interface ThemeButtonProps {
    toggleTheme: () => void;
    theme: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ toggleTheme, theme }) => {
    return (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
            <button
                onClick={toggleTheme}
                className="bg-gray-700 dark:bg-gray-200 text-gray-200 dark:text-gray-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                aria-label="Toggle Theme"
                title="Toggle Theme"
            >
                {theme === "light" ? (
                    <GiLightBulb className="text-xl sm:text-3xl text-yellow-500" />
                ) : (
                    <GiLightBulb className="text-xl sm:text-3xl" />
                )}
            </button>
        </div>
    )
}

export default ThemeButton