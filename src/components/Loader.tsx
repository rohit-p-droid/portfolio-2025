import React from 'react';

const Loader: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div className="flex items-center justify-center">
    <svg
      className="animate-spin text-gray-600 dark:text-gray-300"
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

export default Loader;
