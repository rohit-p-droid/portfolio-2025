import { apiRequest } from "../../utils/apiRequest";
import type { ApiResponse } from "../../common/types";
import type { Project } from "../pages/projects/ProjectsList";

export interface ProjectsQueryParams {
  page?: number;
  limit?: number;
  title?: string;
  search?: string;
}

export enum ProjectStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
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
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.title) queryParams.append('title', params.title);
  if (params.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const url = `/project/get${queryString ? `?${queryString}` : ''}`;

  const response: ApiResponse<any> = await apiRequest({
    url,
    method: "GET"
  });

  if (!response.data) throw new Error("Projects data not found");

  const { projects, page, limit, total } = response.data;
  const limitNum = typeof limit === "string" ? parseInt(limit) : limit;
  const totalPages = Math.ceil(total / limitNum);

  return {
    projects,
    pagination: {
      total,
      page,
      limit: limitNum,
      totalPages
    }
  }
};

export const createProject = async (projectData: Omit<Project, '_id' | 'createdAt'>): Promise<Project> => {
  const response: ApiResponse<Project> = await apiRequest({
    url: "/project/create",
    method: "POST",
    data: projectData
  });

  if (!response.data) throw new Error("Failed to create project");
  return response.data;
};

export const updateProject = async (id: string, projectData: Partial<Omit<Project, '_id' | 'createdAt'>>): Promise<Project> => {
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
