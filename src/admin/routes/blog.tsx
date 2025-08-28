import { lazy } from "react"
import LazyComponent from "../../components/LazyComponent";

const BlogList = lazy(() => import("../pages/blogs/BlogList"));
const BlogForm = lazy(() => import("../pages/blogs/BlogForm"));

const blogRoutes = {
    path: 'blogs',
    children: [
        {
            index: true,
            element: (
                <LazyComponent>
                    <BlogList />
                </LazyComponent>
            )
        },
        {
            path: "create",
            element: (
                <LazyComponent>
                    <BlogForm />
                </LazyComponent>
            )
        },
        {
            path: "edit/:id",
            element: (
                <LazyComponent>
                    <BlogForm />
                </LazyComponent>
            )
        }
    ]
}

export default blogRoutes;