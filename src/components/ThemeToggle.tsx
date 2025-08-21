import React, { useState, useEffect } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

interface ThemeToggleProps {
    className?: string;
    showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('theme');
            if (saved === 'dark') {
                setDark(true);
                document.documentElement.classList.add('dark');
            } else if (saved === 'light') {
                setDark(false);
                document.documentElement.classList.remove('dark');
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setDark(true);
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        } catch (e) {
            // ignore (SSR or restricted storage)
        }
    }, []);

    const toggleTheme = () => {
        setDark((prev) => {
            const next = !prev;
            try {
                if (next) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
            } catch (e) {
                // ignore
            }
            return next;
        });
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 ${className}`}
        >
            <span className="text-lg">{dark ? <BiMoon /> : <BiSun />}</span>
        </button>
    );
};

export default ThemeToggle;
