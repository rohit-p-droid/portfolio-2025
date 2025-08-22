import { lazy } from "react";
import LazyComponent from "../../components/LazyComponent";

const SkillsList = lazy(() => import("../pages/skills/SkillsList"));
const SkillForm = lazy(() => import("../pages/skills/SkillForm"));

const skillRoutes = {
    path: "skills",
    children: [
        {
            index: true,
            element: (
                <LazyComponent>
                    <SkillsList />
                </LazyComponent>
            )
        },
        {
            path: "create",
            element: (
                <LazyComponent>
                    <SkillForm />
                </LazyComponent>
            )
        },
        {
            path: "edit/:id",
            element: (
                <LazyComponent>
                    <SkillForm />
                </LazyComponent>
            )
        }
    ]
}

export default skillRoutes;