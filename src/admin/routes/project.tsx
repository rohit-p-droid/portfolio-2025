import { lazy } from "react";
import LazyComponent from "../../components/LazyComponent";

const ProjectsList = lazy(() => import("../pages/projects/ProjectsList"));
const ProjectForm = lazy(() => import("../pages/projects/ProjectForm"));

const projectRoutes = {
    path: "projects",
    children: [
        {
            index: true,
            element: (
                <LazyComponent>
                    <ProjectsList />
                </LazyComponent>
            )
        },
        {
            path: "create",
            element: (
                <LazyComponent>
                    <ProjectForm />
                </LazyComponent>
            )
        },
        {
            path: "edit/:id",
            element: (
                <LazyComponent>
                    <ProjectForm />
                </LazyComponent>
            )
        }
    ]
}

export default projectRoutes;