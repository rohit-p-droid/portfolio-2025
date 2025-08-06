import { useQuery } from "@tanstack/react-query"
import {type AboutContent, type CertificateContent, type ExperienceContent, getAboutSection, getCertificates, getExperience, getHeroSection, getProjects, type HeroContent, type ProjectContent } from "../services"

export const UseHeroSection = () => {
    return useQuery<HeroContent, Error>({
        queryKey: ['heroSection'],
        queryFn: getHeroSection
    });
}

export const UseAboutSection = () => {
    return useQuery<AboutContent, Error>({
        queryKey: ['aboutSection'],
        queryFn: getAboutSection,
    });
}

export const UseCertificates = () => {
    return useQuery<CertificateContent[], Error>({
        queryKey: ['certificates'],
        queryFn: getCertificates,
    });
}

export const UseProjects = () => {
    return useQuery<ProjectContent[], Error>({
        queryKey: ['projects'],
        queryFn: getProjects,
    });
}

export const UseExperience = () => {
    return useQuery<ExperienceContent[], Error>({
        queryKey: ['experience'],
        queryFn: getExperience,
    });
}
