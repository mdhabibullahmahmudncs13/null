import { createContext, useContext, ReactNode } from 'react';
import {
  usePersonalData,
  useProjectsData,
  useSkillsData,
  useAchievementsData,
  useQuotesData,
  useNavigationData,
  useImagesData,
} from '../hooks/useAppwriteData';
import type {
  PersonalInfo,
  ProjectsData,
  SkillsData,
  AchievementsData,
  QuotesData,
  NavigationData,
  ImagesData,
} from '../types/appwrite';

interface AppwriteContextType {
  personal: PersonalInfo | null;
  projects: ProjectsData | null;
  skills: SkillsData | null;
  achievements: AchievementsData | null;
  quotes: QuotesData | null;
  navigation: NavigationData | null;
  images: ImagesData | null;
  isLoading: boolean;
}

const AppwriteContext = createContext<AppwriteContextType | undefined>(undefined);

export function AppwriteProvider({ children }: { children: ReactNode }) {
  const personal = usePersonalData();
  const projects = useProjectsData();
  const skills = useSkillsData();
  const achievements = useAchievementsData();
  const quotes = useQuotesData();
  const navigation = useNavigationData();
  const images = useImagesData();

  const isLoading = !personal || !projects || !skills || !achievements || !quotes || !navigation || !images;

  const value: AppwriteContextType = {
    personal,
    projects,
    skills,
    achievements,
    quotes,
    navigation,
    images,
    isLoading,
  };

  return (
    <AppwriteContext.Provider value={value}>
      {children}
    </AppwriteContext.Provider>
  );
}

export function useAppwriteContext() {
  const context = useContext(AppwriteContext);
  if (context === undefined) {
    throw new Error('useAppwriteContext must be used within AppwriteProvider');
  }
  return context;
}
