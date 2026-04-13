import { useQuery } from "@tanstack/react-query"
import {type AboutContent, type CertificateContent, type ExperienceContent, getAboutSection, getCertificates, getExperience, getHeroSection, getSkills, type HeroContent, type SkillCategory } from "../services"

export const UseHeroSection = () => {
    return useQuery<HeroContent, Error>({
        queryKey: ['heroSection'],
        queryFn: getHeroSection,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
}

export const UseAboutSection = () => {
    return useQuery<AboutContent, Error>({
        queryKey: ['aboutSection'],
        queryFn: getAboutSection,
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}

export const UseCertificates = () => {
    return useQuery<CertificateContent[], Error>({
        queryKey: ['certificates'],
        queryFn: getCertificates,
        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}

export const UseExperience = () => {
    return useQuery<ExperienceContent[], Error>({
        queryKey: ['experience'],
        queryFn: getExperience,
        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}

export const UseSkills = () => {
    return useQuery<SkillCategory[], Error>({
        queryKey: ['skills'],
        queryFn: getSkills,
        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}
