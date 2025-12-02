import { useState, useEffect } from 'react';
import {
  personalService,
  projectsService,
  skillsService,
  achievementsService,
  quotesService,
  navigationService,
  imagesService,
} from '../services/appwrite.service';
import type {
  PersonalInfo,
  ProjectsData,
  SkillsData,
  AchievementsData,
  QuotesData,
  NavigationData,
  ImagesData,
} from '../types/appwrite';

// Generic hook for Appwrite data fetching
function useAppwriteData<T>(fetchFunction: () => Promise<T | null>): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading data:', err);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}

// Personal Info Hook
export function usePersonalData() {
  return useAppwriteData<PersonalInfo>(personalService.get);
}

// Projects Hooks
export function useProjectsData() {
  return useAppwriteData<ProjectsData>(projectsService.getAll);
}

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    projectsService.getFeatured().then(setProjects);
  }, []);

  return projects;
}

// Skills Hook
export function useSkillsData() {
  return useAppwriteData<SkillsData>(skillsService.get);
}

// Achievements Hook
export function useAchievementsData() {
  return useAppwriteData<AchievementsData>(achievementsService.get);
}

// Quotes Hooks
export function useQuotesData() {
  return useAppwriteData<QuotesData>(quotesService.getAll);
}

export function useRandomQuote() {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    quotesService.getRandom().then(setQuote);
  }, []);

  return quote;
}

// Navigation Hook
export function useNavigationData() {
  return useAppwriteData<NavigationData>(navigationService.get);
}

// Images Hook
export function useImagesData() {
  return useAppwriteData<ImagesData>(imagesService.get);
}

// Legacy compatibility - keep the old useJsonData for gradual migration
export function useJsonData<T>(dataPath: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const module = await import(`../data/${dataPath}.json`);
        setData(module.default);
      } catch (error) {
        console.error(`Failed to load data from ${dataPath}.json:`, error);
      }
    };

    loadData();
  }, [dataPath]);

  return data;
}
