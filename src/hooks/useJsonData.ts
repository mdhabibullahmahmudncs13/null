import { useState, useEffect } from 'react';

// Re-export Appwrite hooks as the main data hooks
export {
  usePersonalData,
  useProjectsData,
  useSkillsData,
  useAchievementsData,
  useQuotesData,
  useNavigationData,
  useImagesData,
} from './useAppwriteData';

// Keep legacy JSON loader for backward compatibility
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