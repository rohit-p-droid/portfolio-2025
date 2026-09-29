import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  smooth?: boolean;
  delay?: number;
}

const ScrollToTop = ({ smooth = true, delay = 0 }: ScrollToTopProps = {}) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        } else {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: smooth ? 'smooth' : 'auto'
          });
        }
      }, delay || 50);
      return () => clearTimeout(timer);
    } else {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: smooth ? 'smooth' : 'auto'
        });
      };

      if (delay > 0) {
        const timeoutId = setTimeout(scrollToTop, delay);
        return () => clearTimeout(timeoutId);
      } else {
        scrollToTop();
      }
    }
  }, [pathname, hash, smooth, delay]);

  return null;
};

export default ScrollToTop;
