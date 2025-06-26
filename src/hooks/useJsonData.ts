import { useState, useEffect } from 'react';

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

export function usePersonalData() {
  return useJsonData<{
    name: string;
    shortName: string;
    title: string;
    subtitle: string;
    description: string;
    email: string;
    currentWork: string;
    bio: {
      greeting: string;
      paragraphs: string[];
    };
    contact: {
      description: string;
      methods: Array<{
        icon: string;
        text: string;
        alt: string;
      }>;
    };
    socialLinks: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
    footer: {
      description: string;
      copyright: string;
      socialLinks: Array<{
        name: string;
        url: string;
        icon: string;
      }>;
    };
  }>('personal');
}

export function useNavigationData() {
  return useJsonData<{
    logo: {
      text: string;
      icon: string;
    };
    menuItems: Array<{
      text: string;
      href: string;
      active: boolean;
    }>;
    languages: Array<{
      code: string;
      active: boolean;
    }>;
  }>('navigation');
}

export function useProjectsData() {
  return useJsonData<{
    sectionTitle: string;
    viewAllText: string;
    projects: Array<{
      id: number;
      title: string;
      description: string;
      image: string;
      technologies: string[];
      liveUrl: string;
      codeUrl: string;
      actions: Array<{
        label: string;
        primary: boolean;
        type: string;
      }>;
    }>;
  }>('projects');
}

export function useSkillsData() {
  return useJsonData<{
    sectionTitle: string;
    categories: Array<{
      title: string;
      skills: string[][];
    }>;
  }>('skills');
}

export function useQuotesData() {
  return useJsonData<{
    quotes: Array<{
      text: string;
      author: string;
    }>;
  }>('quotes');
}

export function useImagesData() {
  return useJsonData<{
    hero: {
      profileImage: string;
      alt: string;
    };
    about: {
      profileImage: string;
      alt: string;
    };
    decorative: {
      union: string;
      union1: string;
      union2: string;
      union3: string;
      line14: string;
      line15: string;
    };
  }>('images');
}

export function useAchievementsData() {
  return useJsonData<{
    sectionTitle: string;
    categories: Array<{
      title: string;
      icon: string;
      items: Array<{
        id: number;
        title: string;
        organization: string;
        date: string;
        description: string;
        credentialId?: string;
        verificationUrl?: string;
        position?: string;
        image: string;
        skills: string[];
      }>;
    }>;
  }>('achievements');
}