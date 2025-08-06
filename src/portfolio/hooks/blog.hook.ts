import { useQuery } from "@tanstack/react-query"
import { type BlogDetailView, type BlogPost, getBlogBySlug, getBlogs } from "../services"

export const UseBlogList = () => {
    return useQuery<BlogPost[], Error>({
        queryKey: ['blogList'],
        queryFn: getBlogs,
    })
}

export const UseBlogDetail = (slug: string | undefined) => {
    return useQuery<BlogDetailView | null, Error>({
        queryKey: ['blog', slug],
        queryFn: ({ queryKey }) => getBlogBySlug(queryKey[1] as string),
        enabled: !!slug,
    });
}