import { useQuery } from "@tanstack/react-query";
import type { ProjectContent } from "../services";
import { getProjects } from "../services/projects.service";

export const UseProjects = () => {
    return useQuery<ProjectContent[], Error>({
        queryKey: ['projects'],
        queryFn: getProjects,
    });
}