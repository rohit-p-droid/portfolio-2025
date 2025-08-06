import { apiRequest } from "../../utils/apiRequest";

// Interface for blog list items (summary view)
export interface BlogPost {
    title: string;
    description: string;
    tags: string[];
    date: string;
    readTime: string;
    slug: string;
}

// Interface for detailed blog view (extends BlogPost with additional fields)
export interface BlogDetailView extends BlogPost {
    id: string;
    content: string; // HTML content
    author: string;
}

// API service functions
export const getBlogs = async (): Promise<{ data: BlogPost[] }> => {
    try {
        const response = await apiRequest<BlogPost[]>({
            url: "/blogs/active",
            method: "GET"
        });
        return { data: response };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const response = await apiRequest<BlogPost>({
            url: `/blogs/slug/${slug}`,
            method: "GET"
        });
        return response;
    } catch (error) {
        console.error('Error fetching blog by slug:', error);
        return null;
    }
};

export const getBlogDetailBySlug = async (slug: string): Promise<{ data: BlogDetailView | null }> => {
    try {
        const response = await apiRequest<BlogDetailView>({
            url: `/blogs/detail/${slug}`,
            method: "GET"
        });
        return { data: response };
    } catch (error) {
        console.error('Error fetching blog detail:', error);
        return { data: null };
    }
};

export const getRelatedBlogs = async (blogId: string): Promise<{ data: any[] }> => {
    try {
        const response = await apiRequest<any[]>({
            url: `/blogs/${blogId}/related`,
            method: "GET"
        });
        return { data: response };
    } catch (error) {
        console.error('Error fetching related blogs:', error);
        // Return fallback related blogs
        return { 
            data: [
                {
                    id: "2",
                    title: "A Deep Dive into Tailwind CSS and Utility-First Design",
                    excerpt: "Let's break down why Tailwind CSS has taken over the frontend world, with real-world examples and tips.",
                    readTime: "5 min read",
                    date: "July 5, 2025"
                },
                {
                    id: "3",
                    title: "Dark Mode: Building Theme-Toggles in React",
                    excerpt: "Here's how to implement seamless light/dark theme switching in your React apps using Tailwind and context.",
                    readTime: "4 min read",
                    date: "June 20, 2025"
                }
            ]
        };
    }
};

// Legacy export for backward compatibility
export const relatedBlogs = [
    {
        id: "2",
        title: "A Deep Dive into Tailwind CSS and Utility-First Design",
        excerpt: "Let's break down why Tailwind CSS has taken over the frontend world, with real-world examples and tips.",
        readTime: "5 min read",
        date: "July 5, 2025"
    },
    {
        id: "3",
        title: "Dark Mode: Building Theme-Toggles in React",
        excerpt: "Here's how to implement seamless light/dark theme switching in your React apps using Tailwind and context.",
        readTime: "4 min read",
        date: "June 20, 2025"
    }
];