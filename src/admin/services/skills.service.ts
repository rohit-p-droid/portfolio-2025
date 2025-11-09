import { apiRequest } from "../../utils/apiRequest";
import type { ApiResponse } from "../../common/types";

export interface Skill {
  _id?: string;
  category: string;
  item: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface SkillsApiResponse {
  skills: Skill[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getSkills = async (params: SkillsQueryParams = {}): Promise<SkillsApiResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.category) queryParams.append('category', params.category);
  if (params.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const url = `/portfolio/list-skill${queryString ? `?${queryString}` : ''}`;

  const response: ApiResponse<SkillsApiResponse> = await apiRequest({
    url,
    method: "GET"
  });

  if (!response.data) throw new Error("Skills data not found");
  return response.data;
};

export const createSkill = async (skillData: Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>): Promise<Skill> => {
  const response: ApiResponse<Skill> = await apiRequest({
    url: "/portfolio/skill/create",
    method: "POST",
    data: skillData
  });

  if (!response.data) throw new Error("Failed to create skill");
  return response.data;
};

export const updateSkill = async (id: string, skillData: Partial<Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Skill> => {
  const response: ApiResponse<Skill> = await apiRequest({
    url: `/portfolio/skill/update/${id}`,
    method: "PUT",
    data: skillData
  });

  if (!response.data) throw new Error("Failed to update skill");
  return response.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await apiRequest({
    url: `/portfolio/skill/delete/${id}`,
    method: "DELETE"
  });
};

export const getSkillById = async (id: string): Promise<Skill> => {
  const response: ApiResponse<Skill> = await apiRequest({
    url: `/portfolio/skill/${id}`,
    method: "GET"
  });

  if (!response.data) throw new Error("Skill not found");
  return response.data;
};
