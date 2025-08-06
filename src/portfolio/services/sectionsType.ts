export interface HeroContent {
    name: string;
    role: string;
    tagline: string;
    description: string;
    photo: string;
}

export interface AboutContent {
    title: string;
    paragraphs: string[];
    experienceCount: number;
    projectsCount: number;
    technologyCount: number;
}

export interface SkillItem {
    name: string;
    iconName: string;
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
}

export interface CertificateContent {
    title: string;
    platform: string;
    date: string;
    link?: string;
}

export interface ExperienceContent {
    role: string;
    company: string;
    fromDate: string,
    toDate: string,
    location: string;
    description: string[];
}

export interface ProjectContent {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image: string;
    live?: string;
    github?: string;
}