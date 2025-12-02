// Personal Info Types
export interface PersonalInfo {
  $id?: string;
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
}

// Project Types
export interface Project {
  $id?: string;
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  codeUrl: string;
  featured?: boolean;
  order?: number;
  actions: Array<{
    label: string;
    primary: boolean;
    type: string;
  }>;
}

export interface ProjectsData {
  sectionTitle: string;
  viewAllText: string;
  projects: Project[];
}

// Skills Types
export interface SkillCategory {
  title: string;
  skills: string[][];
}

export interface SkillsData {
  $id?: string;
  sectionTitle: string;
  categories: SkillCategory[];
}

// Achievements Types
export interface AchievementItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  description?: string;
  credentialId?: string;
  verificationUrl?: string;
  position?: string;
  image: string;
  skills: string[];
}

export interface AchievementCategory {
  title: string;
  icon: string;
  items: AchievementItem[];
}

export interface AchievementsData {
  $id?: string;
  sectionTitle: string;
  categories: AchievementCategory[];
}

// Quote Types
export interface Quote {
  $id?: string;
  text: string;
  author: string;
  order?: number;
}

export interface QuotesData {
  quotes: Quote[];
}

// Navigation Types
export interface NavigationData {
  $id?: string;
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
}

// Images Types
export interface ImagesData {
  $id?: string;
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
}
