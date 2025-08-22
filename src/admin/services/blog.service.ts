import { apiRequest } from "../../utils/apiRequest";
import type { ApiResponse } from "../../common/types";

export interface Blog {
  _id: string;
  title: string;
  tags: string[];
  date: string;
  readTime: number;
  slug: string;
}

export interface BlogsQueryParams {
  page?: number;
  limit?: number;
  title?: string;
  search?: string;
}

export interface BlogsApiResponse {
  blogs: Blog[];
  page: number;
  limit: string | number;
  total: number;
}

export interface BlogCreateData {
  title: string;
  tags: string[];
  date: string;
  readTime: number;
  slug: string;
}

export interface BlogUpdateData extends Partial<BlogCreateData> {}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Get all blogs with optional filtering and pagination
export const getBlogs = async (params: BlogsQueryParams = {}): Promise<{
  blogs: Blog[];
  pagination: PaginationInfo;
}> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.title) queryParams.append('title', params.title);
    if (params.search) queryParams.append('title', params.search); // Using title for search

    const queryString = queryParams.toString();
    const url = `/portfolio/blog${queryString ? `?${queryString}` : ''}`;
    
    const response: ApiResponse<BlogsApiResponse> = await apiRequest({
      url,
      method: 'GET'
    });
    
    if (!response.data) {
      throw new Error('Failed to fetch blogs');
    }

    const { blogs, page, limit, total } = response.data;
    const limitNum = typeof limit === 'string' ? parseInt(limit) : limit;
    const totalPages = Math.ceil(total / limitNum);

    return {
      blogs,
      pagination: {
        total,
        page,
        limit: limitNum,
        totalPages
      }
    };
  } catch (error: any) {
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch blogs');
  }
};

// Get a single blog by ID
export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    const response: ApiResponse<Blog> = await apiRequest({
      url: `/portfolio/blog/${id}`,
      method: 'GET'
    });
    
    if (!response.data) {
      throw new Error('Blog not found');
    }
    
    return response.data;
  } catch (error: any) {
    if (error.message === 'Blog not found') {
      throw new Error('Blog not found');
    }
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch blog');
  }
};

// Create a new blog
export const createBlog = async (blogData: BlogCreateData): Promise<Blog> => {
  try {
    const response: ApiResponse<Blog> = await apiRequest({
      url: '/portfolio/blog/create',
      method: 'POST',
      data: blogData
    });
    
    if (!response.data) {
      throw new Error('Failed to create blog');
    }
    
    return response.data;
  } catch (error: any) {
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create blog');
  }
};

// Update an existing blog
export const updateBlog = async (id: string, blogData: BlogUpdateData): Promise<Blog> => {
  try {
    const response: ApiResponse<Blog> = await apiRequest({
      url: `/portfolio/blog/update/${id}`,
      method: 'PUT',
      data: blogData
    });
    
    if (!response.data) {
      throw new Error('Failed to update blog');
    }
    
    return response.data;
  } catch (error: any) {
    if (error.message === 'Blog not found') {
      throw new Error('Blog not found');
    }
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('Failed to update blog');
  }
};

// Delete a blog
export const deleteBlog = async (id: string): Promise<void> => {
  try {
    const response: ApiResponse<null> = await apiRequest({
      url: `/portfolio/blog/delete/${id}`,
      method: 'DELETE'
    });
    
    if (!response.success) {
      throw new Error('Failed to delete blog');
    }
  } catch (error: any) {
    if (error.message === 'Blog not found') {
      throw new Error('Blog not found');
    }
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('Failed to delete blog');
  }
};
