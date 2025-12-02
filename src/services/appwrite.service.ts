import { databases, DATABASE_ID, COLLECTIONS, Query } from '../lib/appwrite';
import type {
  PersonalInfo,
  Project,
  ProjectsData,
  SkillsData,
  AchievementsData,
  Quote,
  QuotesData,
  NavigationData,
  ImagesData,
} from '../types/appwrite';

// Personal Info Service
export const personalService = {
  async get(): Promise<PersonalInfo | null> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PERSONAL);
      return response.documents[0] as unknown as PersonalInfo;
    } catch (error) {
      console.error('Error fetching personal info:', error);
      return null;
    }
  },

  async update(data: Partial<PersonalInfo>): Promise<PersonalInfo | null> {
    try {
      const existing = await this.get();
      if (existing && existing.$id) {
        const response = await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.PERSONAL,
          existing.$id,
          data
        );
        return response as unknown as PersonalInfo;
      }
      return null;
    } catch (error) {
      console.error('Error updating personal info:', error);
      return null;
    }
  },
};

// Projects Service
export const projectsService = {
  async getAll(): Promise<ProjectsData> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PROJECTS, [
        Query.orderAsc('order'),
        Query.limit(100),
      ]);
      
      return {
        sectionTitle: 'projects',
        viewAllText: 'View all ~~>',
        projects: response.documents as unknown as Project[],
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { sectionTitle: 'projects', viewAllText: 'View all ~~>', projects: [] };
    }
  },

  async getFeatured(): Promise<Project[]> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PROJECTS, [
        Query.equal('featured', true),
        Query.orderAsc('order'),
        Query.limit(3),
      ]);
      return response.documents as unknown as Project[];
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  },

  async create(data: Omit<Project, '$id'>): Promise<Project | null> {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        'unique()',
        data
      );
      return response as unknown as Project;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        id,
        data
      );
      return response as unknown as Project;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.PROJECTS, id);
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  },
};

// Skills Service
export const skillsService = {
  async get(): Promise<SkillsData | null> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SKILLS);
      return response.documents[0] as unknown as SkillsData;
    } catch (error) {
      console.error('Error fetching skills:', error);
      return null;
    }
  },

  async update(data: Partial<SkillsData>): Promise<SkillsData | null> {
    try {
      const existing = await this.get();
      if (existing && existing.$id) {
        const response = await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.SKILLS,
          existing.$id,
          data
        );
        return response as unknown as SkillsData;
      }
      return null;
    } catch (error) {
      console.error('Error updating skills:', error);
      return null;
    }
  },
};

// Achievements Service
export const achievementsService = {
  async get(): Promise<AchievementsData | null> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.ACHIEVEMENTS);
      return response.documents[0] as unknown as AchievementsData;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return null;
    }
  },

  async update(data: Partial<AchievementsData>): Promise<AchievementsData | null> {
    try {
      const existing = await this.get();
      if (existing && existing.$id) {
        const response = await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.ACHIEVEMENTS,
          existing.$id,
          data
        );
        return response as unknown as AchievementsData;
      }
      return null;
    } catch (error) {
      console.error('Error updating achievements:', error);
      return null;
    }
  },
};

// Quotes Service
export const quotesService = {
  async getAll(): Promise<QuotesData> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.QUOTES, [
        Query.orderAsc('order'),
      ]);
      return {
        quotes: response.documents as unknown as Quote[],
      };
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return { quotes: [] };
    }
  },

  async getRandom(): Promise<Quote | null> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.QUOTES);
      const quotes = response.documents as unknown as Quote[];
      if (quotes.length === 0) return null;
      return quotes[Math.floor(Math.random() * quotes.length)];
    } catch (error) {
      console.error('Error fetching random quote:', error);
      return null;
    }
  },
};

// Navigation Service
export const navigationService = {
  async get(): Promise<NavigationData | null> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.NAVIGATION);
      return response.documents[0] as unknown as NavigationData;
    } catch (error) {
      console.error('Error fetching navigation:', error);
      return null;
    }
  },
};

// Images Service
export const imagesService = {
  async get(): Promise<ImagesData | null> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.IMAGES);
      return response.documents[0] as unknown as ImagesData;
    } catch (error) {
      console.error('Error fetching images:', error);
      return null;
    }
  },
};
