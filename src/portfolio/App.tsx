import './App.css';
import { Footer } from './sections';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { ThemeButton, ScrollToTopButton, FloatingMenu } from './components';

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <ScrollToTop />
      <ThemeButton toggleTheme={toggleTheme} theme={theme} />
      <FloatingMenu />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App