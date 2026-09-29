import './App.css';
import { Footer } from './sections';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollToTopButton, Navbar } from './components';

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("portfolio_theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
      },
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white antialiased transition-colors duration-300 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
        <ScrollToTopButton />
      </QueryClientProvider>
    </div>
  );
}

export default App;