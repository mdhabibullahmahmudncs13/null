/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_PERSONAL_COLLECTION_ID: string;
  readonly VITE_APPWRITE_PROJECTS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_SKILLS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_QUOTES_COLLECTION_ID: string;
  readonly VITE_APPWRITE_NAVIGATION_COLLECTION_ID: string;
  readonly VITE_APPWRITE_IMAGES_COLLECTION_ID: string;
  readonly VITE_APPWRITE_STORAGE_BUCKET_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
