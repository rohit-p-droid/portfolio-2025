export const skillsContent = [
    {
        category: "Frontend",
        items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML", "CSS"]
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "Spring Boot", "Django", "REST APIs"]
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL", "SQLite", "Firebase"]
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Postman", "VS Code", "Docker", "Figma"]
    },
    {
        category: "Learning / Focus Areas",
        items: ["AI/ML", "System Design", "Cloud (AWS)", "Cybersecurity"]
    }
];

export const experienceContent = [
  {
    role: "Software Engineer",
    company: "ABC Tech Pvt Ltd",
    period: "Nov 2023 – Present",
    location: "Remote, India",
    description: [
      "Built scalable web applications using React, Node.js, and PostgreSQL.",
      "Optimized backend APIs, reducing response time by 40%.",
      "Contributed to internal tools improving developer productivity."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Startup Spark",
    period: "May 2023 – Oct 2023",
    location: "Mumbai, India",
    description: [
      "Developed core frontend components with Tailwind CSS and Next.js.",
      "Improved SEO performance by 25% through dynamic routing and meta optimizations.",
      "Assisted in integrating Firebase authentication and Firestore."
    ]
  }
];

// +++++++++++++++++++++++++++++++++++++++++++======================

import { apiRequest } from "../../utils/apiRequest";
import type { ApiResponse } from "../../common/types";
import type { HeroContent, AboutContent, SkillCategory, CertificateContent, ProjectContent, ExperienceContent } from "./sectionsType";



export const getHeroSection = async (): Promise<HeroContent> => {
    const response: ApiResponse<HeroContent> = await apiRequest({
        url: "/portfolio/hero-section/active",
        method: "GET"
    });
    if (!response.data ) throw new Error('Hero section data not found');
    return response.data;
};

export const getAboutSection = async (): Promise<AboutContent> => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    const response: ApiResponse<AboutContent> = await apiRequest({
        url: "/portfolio/about-section/active",
        method: "GET"
    });
    if (!response.data ) throw new Error('Hero section data not found');
    return response.data;
};

export const getCertificates = async (): Promise<CertificateContent[]> => {
    const response: ApiResponse<CertificateContent[]> = await apiRequest({
        url: "/portfolio/certificate/active",
        method: "GET"
    });
    if(!response.data) throw new Error("Certificate data not found");
    return response.data;
};

export const getProjects = async (): Promise<ProjectContent[]> => {
    const response: ApiResponse<ProjectContent[]> = await apiRequest({
        url: "/project/active",
        method: "GET"
    });
    if(!response.data) throw new Error("Projects data not found");
    return response.data;
}

export const getExperience = async (): Promise<ExperienceContent[]> => {
    const response: ApiResponse<ExperienceContent[]> = await apiRequest({
        url: "/portfolio/experience/",
        method: "GET"
    });
    if(!response.data) throw new Error("Experience data not found");
    return response.data;
}








