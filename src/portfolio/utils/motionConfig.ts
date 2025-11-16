// Motion configuration for better performance
export const MOTION_CONFIG = {
  // Reduced animation durations for faster rendering
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.4
  },
  
  // Simplified easing
  ease: "easeOut",
  
  // Viewport settings for better performance
  viewport: {
    once: true,
    amount: 0.1, // Reduced from 0.3+ to trigger earlier
    margin: "0px 0px -100px 0px" // Trigger animations earlier
  },
  
  // Reduced spring settings
  spring: {
    type: "spring",
    stiffness: 100, // Reduced from 400
    damping: 15     // Increased for faster settling
  }
};

// Pre-defined motion variants for consistency and performance
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: MOTION_CONFIG.duration.fast }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: MOTION_CONFIG.duration.fast }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: MOTION_CONFIG.duration.fast }
};

// Simplified hover effects (no complex transforms)
export const simpleHover = {
  scale: 1.02, // Reduced from 1.05+
  transition: { duration: 0.1 }
};

// Disable animations on mobile for better performance
export const isMobile = () => 
  typeof window !== 'undefined' && window.innerWidth < 768;

export const getMotionProps = (props: any) => 
  isMobile() ? {} : props;
