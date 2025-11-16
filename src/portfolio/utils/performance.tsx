import { lazy, Suspense } from 'react';

// Lazy load components
export const LazyHero = lazy(() => import('../sections/Hero/Hero'));
export const LazyAbout = lazy(() => import('../sections/about/About'));
export const LazyProjects = lazy(() => import('../sections/projects/Projects'));
export const LazySkills = lazy(() => import('../sections/skills/Skills'));
export const LazyExperience = lazy(() => import('../sections/experience/Experience'));
export const LazyCertifications = lazy(() => import('../sections/certificates/Certifications'));
export const LazyBlog = lazy(() => import('../sections/blog/Blogs'));
export const LazyContact = lazy(() => import('../sections/contact/Contact'));

// Fallback component for loading
const ComponentFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Wrapper component with Suspense
export const LazyComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<ComponentFallback />}>
    {children}
  </Suspense>
);

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  // Monitor Core Web Vitals
  if (typeof window !== 'undefined') {
    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      });
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }
};
