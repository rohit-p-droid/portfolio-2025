import App from "../App";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));

const AdminLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-200 dark:border-gray-600"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
    </div>
);

const LazyComponent = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<AdminLoading />}>
        {children}
    </Suspense>
);

export const adminRoutes = {
    path: "/admin",
    element: <App />,
    children: [
        {
            path: "",
            element: (
                <LazyComponent>
                    <Dashboard />
                </LazyComponent>
            )
        },
    ],
};
