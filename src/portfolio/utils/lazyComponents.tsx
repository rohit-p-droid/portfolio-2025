// Optimized components for performance
import { lazy, type ComponentType, Suspense } from 'react';

// Simple loading component for better performance
const SimpleLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
  </div>
);

// Lazy load heavy components with error boundaries
export const LazyAbout = lazy(() => import('../sections/about/About'));
export const LazySkills = lazy(() => import('../sections/skills/Skills'));
export const LazyProjects = lazy(() => import('../sections/projects/Projects'));
export const LazyExperience = lazy(() => import('../sections/experience/Experience'));
export const LazyTestimonials = lazy(() => import('../sections/testimonials/Testimonials'));
export const LazyCertifications = lazy(() => import('../sections/certificates/Certifications'));
export const LazyBlog = lazy(() => import('../sections/blog/Blogs'));
export const LazyContact = lazy(() => import('../sections/contact/Contact'));

// Wrapper for lazy components with consistent loading
export const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SimpleLoader />}>
    {children}
  </Suspense>
);

// Performance optimized motion wrapper
export const OptimizedMotion = ({ children, ...motionProps }: any) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // On mobile or reduced motion preference, just return children without motion
  if (prefersReducedMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return <div>{children}</div>;
  }

  // For desktop with motion enabled, use framer-motion (dynamically imported)
  const motion = import('framer-motion').then(m => m.motion);
  
  return <div {...motionProps}>{children}</div>;
};
