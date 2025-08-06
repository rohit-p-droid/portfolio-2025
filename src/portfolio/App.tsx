import './App.css';
import { Footer } from './sections';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeButton, ScrollToTopButton, FloatingMenu } from './components';

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <ThemeButton toggleTheme={toggleTheme} theme={theme} />
        <FloatingMenu />
        <Outlet />
        <Footer />
        <ScrollToTopButton />
      </QueryClientProvider>
    </>
  )
}

export default App