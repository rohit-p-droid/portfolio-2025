import App from '../App';
import { Suspense, lazy } from 'react';

const Homepage = lazy(() => import('../pages/home/Homepage'));
const About = lazy(() => import('../pages/about/About'));
const Skills = lazy(() => import('../pages/skills/Skills'));
const Projects = lazy(() => import('../pages/projects/Projects'));
const Certifications = lazy(() => import('../pages/certifications/Certifications'));
const Experience = lazy(() => import('../pages/experience/Experience'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const Contact = lazy(() => import('../pages/contact/Contact'));

const PortfolioLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-200 dark:border-gray-600"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
    </div>
);

const LazyComponent = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<PortfolioLoading />}>
        {children}
    </Suspense>
);

export const portfolioRoutes = {
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: (
                <LazyComponent>
                    <Homepage />
                </LazyComponent>
            )
        },
        {
            path: "about",
            element: (
                <LazyComponent>
                    <About />
                </LazyComponent>
            )
        },
        {
            path: "skills",
            element: (
                <LazyComponent>
                    <Skills />
                </LazyComponent>
            )
        },
        {
            path: "projects",
            element: (
                <LazyComponent>
                    <Projects />
                </LazyComponent>
            )
        },
        {
            path: "certifications",
            element: (
                <LazyComponent>
                    <Certifications />
                </LazyComponent>
            )
        },
        {
            path: "experience",
            element: (
                <LazyComponent>
                    <Experience />
                </LazyComponent>
            )
        },
        {
            path: "blog",
            element: (
                <LazyComponent>
                    <Blog />
                </LazyComponent>
            )
        },
        {
            path: "contact",
            element: (
                <LazyComponent>
                    <Contact />
                </LazyComponent>
            )
        },
    ],
};
