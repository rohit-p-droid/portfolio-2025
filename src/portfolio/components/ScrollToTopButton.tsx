import { useState, useEffect } from 'react';

interface ScrollToTopButtonProps {
  showAfter?: number;
  className?: string;
}

const ScrollToTopButton = ({ 
  showAfter = 300, 
  className = "" 
}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button when page is scrolled down and calculate scroll progress
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    setScrollProgress(scrollPercent);
    setIsVisible(scrollTop > showAfter);
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAfter]);

  return (
    <>
      {isVisible && (
        <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
          {/* Progress ring */}
          <div className="relative">
            <svg
              className="w-14 h-14 transform -rotate-90"
              viewBox="0 0 56 56"
            >
              {/* Background circle */}
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="138.2"
                strokeDashoffset={138.2 - (138.2 * scrollProgress) / 100}
                className="text-blue-600 dark:text-blue-400 transition-all duration-300"
              />
            </svg>
            
            {/* Button */}
            <button
              onClick={scrollToTop}
              className="absolute inset-0 m-1.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 group"
              aria-label="Scroll to top"
              title={`Scroll to top (${Math.round(scrollProgress)}% down)`}
            >
              <svg
                className="w-6 h-6 mx-auto group-hover:animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
