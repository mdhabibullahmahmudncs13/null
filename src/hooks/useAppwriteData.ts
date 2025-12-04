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

// Generic hook for Appwrite data fetching with JSON fallback
function useAppwriteData<T>(
  fetchFunction: () => Promise<T | null>,
  fallbackPath?: string
): T | null {
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
          console.error('Error loading from Appwrite:', err);
          
          // Fallback to JSON if Appwrite fails and fallback path is provided
          if (fallbackPath) {
            try {
              console.log(`Loading fallback data from ${fallbackPath}.json`);
              const module = await import(`../data/${fallbackPath}.json`);
              setData(module.default);
            } catch (fallbackErr) {
              console.error(`Failed to load fallback data from ${fallbackPath}.json:`, fallbackErr);
            }
          }
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
  return useAppwriteData<PersonalInfo>(personalService.get, 'personal');
}

// Projects Hooks
export function useProjectsData() {
  return useAppwriteData<ProjectsData>(projectsService.getAll, 'projects');
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
  return useAppwriteData<SkillsData>(skillsService.get, 'skills');
}

// Achievements Hook
export function useAchievementsData() {
  return useAppwriteData<AchievementsData>(achievementsService.get, 'achievements');
}

// Quotes Hooks
export function useQuotesData() {
  return useAppwriteData<QuotesData>(quotesService.getAll, 'quotes');
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
  return useAppwriteData<NavigationData>(navigationService.get, 'navigation');
}

// Images Hook
export function useImagesData() {
  return useAppwriteData<ImagesData>(imagesService.get, 'images');
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
