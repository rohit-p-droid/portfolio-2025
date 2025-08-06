import type { ApiResponse } from "../../common/types";
import { apiRequest } from "../../utils/apiRequest";
import type { ProjectContent } from "./sectionsType";


export const getProjects = async (): Promise<ProjectContent[]> => {
    const response: ApiResponse<ProjectContent[]> = await apiRequest({
        url: "/project/active",
        method: "GET"
    });
    if(!response.data) throw new Error("Projects data not found");
    return response.data;
}