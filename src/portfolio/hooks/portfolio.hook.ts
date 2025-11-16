import { useQuery } from "@tanstack/react-query"
import {type AboutContent, type CertificateContent, type ExperienceContent, getAboutSection, getCertificates, getExperience, getHeroSection, getSkills, type HeroContent, type SkillCategory } from "../services"

// Aggressive caching for better performance
const DEFAULT_STALE_TIME = 20 * 60 * 1000; // 20 minutes
const DEFAULT_GC_TIME = 60 * 60 * 1000; // 1 hour

export const UseHeroSection = () => {
    return useQuery<HeroContent, Error>({
        queryKey: ['heroSection'],
        queryFn: getHeroSection,
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
        // Critical data - enable background refetch
        refetchInterval: 60 * 60 * 1000, // 1 hour
    });
}

export const UseAboutSection = () => {
    return useQuery<AboutContent, Error>({
        queryKey: ['aboutSection'],
        queryFn: getAboutSection,
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
    });
}

export const UseCertificates = () => {
    return useQuery<CertificateContent[], Error>({
        queryKey: ['certificates'],
        queryFn: getCertificates,
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
    });
}

export const UseExperience = () => {
    return useQuery<ExperienceContent[], Error>({
        queryKey: ['experience'],
        queryFn: getExperience,
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
    });
}

export const UseSkills = () => {
    return useQuery<SkillCategory[], Error>({
        queryKey: ['skills'],
        queryFn: getSkills,
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
    });
}
