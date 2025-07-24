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