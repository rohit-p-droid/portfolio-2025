import { apiRequest } from "../../utils/apiRequest";
import type { ApiResponse } from "../../common/types";
import type { Project } from "../pages/projects/ProjectsList";

export interface ProjectsQueryParams {
  page?: number;
  limit?: number;
  title?: string;
  status?: 'active' | 'completed' | 'draft' | 'all';
  search?: string;
}

export interface ProjectsApiResponse {
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getProjects = async (params: ProjectsQueryParams = {}): Promise<ProjectsApiResponse> => {
  // Build query string
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.title) queryParams.append('title', params.title);
  if (params.status && params.status !== 'all') queryParams.append('status', params.status);
  if (params.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const url = `/project/get${queryString ? `?${queryString}` : ''}`;

  const response: ApiResponse<ProjectsApiResponse> = await apiRequest({
    url,
    method: "GET"
  });

  if (!response.data) throw new Error("Projects data not found");
  return response.data;
};

export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  const response: ApiResponse<Project> = await apiRequest({
    url: "/project/create",
    method: "POST",
    data: projectData
  });

  if (!response.data) throw new Error("Failed to create project");
  return response.data;
};

export const updateProject = async (id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> => {
  const response: ApiResponse<Project> = await apiRequest({
    url: `/project/update/${id}`,
    method: "PUT",
    data: projectData
  });

  if (!response.data) throw new Error("Failed to update project");
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await apiRequest({
    url: `/project/delete/${id}`,
    method: "DELETE"
  });
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response: ApiResponse<Project> = await apiRequest({
    url: `/project/${id}`,
    method: "GET"
  });

  if (!response.data) throw new Error("Project not found");
  return response.data;
};
