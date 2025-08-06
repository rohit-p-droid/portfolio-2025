import type { ApiResponse } from "../../common/types";
import { apiRequest } from "../../utils/apiRequest";

export interface BlogPost {
    title: string;
    tags: string[];
    description: string;
    date: string;
    readTime: string;
    slug: string;
}


export interface BlogDetailView extends BlogPost {
    title: string;
    description: string;
    content: string;
    tags: string[];
    date: string;
    readTime: string;
    slug: string;
}

// API service functions
export const getBlogs = async (): Promise<BlogPost[]> => {
    const response: ApiResponse<BlogPost[]> = await apiRequest({
        url: "/blog/published",
        method: "GET"
    });
    if (!response.data) throw new Error('Blogs data not found');
    return response.data;
};

export const getBlogBySlug = async (slug: string): Promise<BlogDetailView | null> => {
    const response: ApiResponse<BlogDetailView> = await apiRequest({
        url: `/blog/${slug}`,
        method: "GET"
    });
    if(!response.data) throw new Error('Blog data not found');

    return response.data;
};


export const getRelatedBlogs = async (): Promise<BlogPost[]> => {
    const response: ApiResponse<BlogPost[]> = await apiRequest({
        url: "/blog/published",
        method: "GET"
    });
    if (!response.data) throw new Error('Blogs data not found');
    return response.data;
};
