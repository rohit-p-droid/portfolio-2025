import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { adminRoutes } from './admin/routes/admin'
import { portfolioRoutes } from './portfolio/routes/portfolio'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  portfolioRoutes,
  adminRoutes
])

// Register service worker for performance
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}