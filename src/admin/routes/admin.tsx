import App from "../App";
import { lazy } from "react";
import blogRoutes from "./blog";
import skillRoutes from "./skill";
import projectRoutes from "./project";
import LazyComponent from "../../components/LazyComponent";

const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Settings = lazy(() => import("../pages/Settings"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoute"));

export const adminRoutes = {
    path: "/admin",
    element: <App />,
    children: [
        {
            path: "login",
            element: (
                <LazyComponent>
                    <Login />
                </LazyComponent>
            )
        },
        {
            path: "",
            element: (
                <LazyComponent>
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                </LazyComponent>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <LazyComponent>
                            <Dashboard />
                        </LazyComponent>
                    )
                },
                projectRoutes,
                skillRoutes,
                blogRoutes,
                ,
                {
                    path: "certificates",
                    element: (
                        <LazyComponent>
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates Management</h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Coming soon...</p>
                            </div>
                        </LazyComponent>
                    )
                },
                {
                    path: "settings",
                    element: (
                        <LazyComponent>
                            <Settings />
                        </LazyComponent>
                    )
                }
            ]
        }
    ],
};
