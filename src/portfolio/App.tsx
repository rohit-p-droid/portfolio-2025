import './App.css';
import { Footer } from './sections';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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

  // Memoize QueryClient to prevent recreation
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000, // 10 minutes - increased for better caching
        gcTime: 15 * 60 * 1000, // 15 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        // Enable background refetch for fresh data
        refetchInterval: 30 * 60 * 1000, // 30 minutes
      },
    },
  }), []);

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