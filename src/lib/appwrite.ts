import { Client, Databases, Storage, Query } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

// Initialize services
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';
export const COLLECTIONS = {
  PERSONAL: import.meta.env.VITE_APPWRITE_PERSONAL_COLLECTION_ID || 'personal_info',
  PROJECTS: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || 'projects',
  SKILLS: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID || 'skills',
  ACHIEVEMENTS: import.meta.env.VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID || 'achievements',
  QUOTES: import.meta.env.VITE_APPWRITE_QUOTES_COLLECTION_ID || 'quotes',
  NAVIGATION: import.meta.env.VITE_APPWRITE_NAVIGATION_COLLECTION_ID || 'navigation',
  IMAGES: import.meta.env.VITE_APPWRITE_IMAGES_COLLECTION_ID || 'images',
};

export const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'portfolio_media';

export { Query, client };
