import { createContext, useContext } from "react";

interface ThemeContextType {
    themeMode: "light" | "dark";
    darkTheme: () => void;
    lightTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType> ({
    themeMode: "light",
    darkTheme: () => { },
    lightTheme: () => { },
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme(): ThemeContextType {
    return useContext(ThemeContext);
}