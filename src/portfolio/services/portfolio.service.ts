import { apiRequest } from "../../utils/apiRequest";
import type { ApiResponse } from "../../common/types";
import type { HeroContent, AboutContent, SkillCategory, CertificateContent, ExperienceContent } from "./sectionsType";



export const getHeroSection = async (): Promise<HeroContent> => {
    setTimeout(() => {}, 30000);
    const response: ApiResponse<HeroContent> = await apiRequest({
        url: "/portfolio/hero-section/active",
        method: "GET"
    });
    if (!response.data) throw new Error('Hero section data not found');
    return response.data;
};

export const getAboutSection = async (): Promise<AboutContent> => {
    const response: ApiResponse<AboutContent> = await apiRequest({
        url: "/portfolio/about-section/active",
        method: "GET"
    });
    if (!response.data) throw new Error('Hero section data not found');
    return response.data;
};

export const getCertificates = async (): Promise<CertificateContent[]> => {
    const response: ApiResponse<CertificateContent[]> = await apiRequest({
        url: "/portfolio/certificate/active",
        method: "GET"
    });
    if (!response.data) throw new Error("Certificate data not found");
    return response.data;
};

export const getExperience = async (): Promise<ExperienceContent[]> => {
    const response: ApiResponse<ExperienceContent[]> = await apiRequest({
        url: "/portfolio/experience/",
        method: "GET"
    });
    if (!response.data) throw new Error("Experience data not found");
    return response.data;
}

export const getSkills = async (): Promise<SkillCategory[]> => {
    const response: ApiResponse<SkillCategory[]> = await apiRequest({
        url: "/portfolio/skill",
        method: "GET"
    });
    if (!response.data) throw new Error("Skills data not found");
    return response.data;
};









