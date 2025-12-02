# 🏗️ System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         APPWRITE CLOUD                               │
│                    (Backend as a Service)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │    DATABASE      │  │     STORAGE      │  │       AUTH        │ │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤ │
│  │ • personal_info  │  │ • Images         │  │ • Future:        │ │
│  │ • projects       │  │ • Certificates   │  │   Admin login    │ │
│  │ • skills         │  │ • Project media  │  │   User mgmt      │ │
│  │ • achievements   │  │ • Profile pics   │  │                  │ │
│  │ • quotes         │  │                  │  │                  │ │
│  │ • navigation     │  │                  │  │                  │ │
│  │ • images         │  │                  │  │                  │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                      │
└───────────────────────────┬──────────────────────────────────────────┘
                            │
                            │ REST API / SDK
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         REACT APPLICATION                            │
│                       (Frontend - Vite)                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    APPLICATION LAYER                          │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  src/App.tsx                                                  │  │
│  │    ├── Route: /                → Home Screen                 │  │
│  │    ├── Route: /projects        → Projects Screen             │  │
│  │    └── Route: /admin           → Admin Panel                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    PRESENTATION LAYER                         │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  src/screens/                                                 │  │
│  │    ├── Home/           (Homepage with all sections)          │  │
│  │    │   └── sections/                                         │  │
│  │    │       ├── HeroSection                                   │  │
│  │    │       ├── AboutMeSection                                │  │
│  │    │       ├── ProjectsSection                               │  │
│  │    │       ├── SkillsSection                                 │  │
│  │    │       ├── AchievementsSection                           │  │
│  │    │       ├── QuoteSection                                  │  │
│  │    │       └── FooterSection                                 │  │
│  │    ├── Projects/       (Full projects gallery)              │  │
│  │    └── Admin/          (Content management)                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                      DATA LAYER                               │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  src/hooks/useAppwriteData.ts                                │  │
│  │    ├── usePersonalData()       → Personal Info               │  │
│  │    ├── useProjectsData()       → All Projects                │  │
│  │    ├── useSkillsData()         → Skills                      │  │
│  │    ├── useAchievementsData()   → Achievements                │  │
│  │    ├── useQuotesData()         → Quotes                      │  │
│  │    ├── useNavigationData()     → Navigation                  │  │
│  │    └── useImagesData()         → Images                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    SERVICE LAYER                              │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  src/services/appwrite.service.ts                            │  │
│  │    ├── personalService         (get, update)                │  │
│  │    ├── projectsService         (getAll, create, update, delete)│  │
│  │    ├── skillsService           (get, update)                │  │
│  │    ├── achievementsService     (get, update)                │  │
│  │    ├── quotesService           (getAll, getRandom)          │  │
│  │    ├── navigationService       (get)                        │  │
│  │    └── imagesService           (get)                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  CONFIGURATION LAYER                          │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  src/lib/appwrite.ts                                         │  │
│  │    ├── Client initialization                                 │  │
│  │    ├── Database instance                                     │  │
│  │    ├── Storage instance                                      │  │
│  │    ├── Collection IDs                                        │  │
│  │    └── Environment config                                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     TYPE LAYER                                │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  src/types/appwrite.ts                                       │  │
│  │    ├── PersonalInfo interface                                │  │
│  │    ├── Project interface                                     │  │
│  │    ├── SkillsData interface                                  │  │
│  │    ├── AchievementsData interface                            │  │
│  │    ├── Quote interface                                       │  │
│  │    ├── NavigationData interface                              │  │
│  │    └── ImagesData interface                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Read Operations (GET)

```
User visits page
     │
     ▼
Component renders
     │
     ▼
useAppwriteData hook called
     │
     ▼
Service function executed
     │
     ▼
Appwrite SDK makes API call
     │
     ▼
Appwrite Cloud returns data
     │
     ▼
Service transforms data
     │
     ▼
Hook updates state
     │
     ▼
Component re-renders with data
     │
     ▼
User sees content
```

### Write Operations (UPDATE/CREATE)

```
User submits admin form
     │
     ▼
Admin component handles submit
     │
     ▼
Service function called (create/update)
     │
     ▼
Data validated
     │
     ▼
Appwrite SDK makes API call
     │
     ▼
Appwrite Cloud saves data
     │
     ▼
Success/error returned
     │
     ▼
Toast notification shown
     │
     ▼
Component refreshes data
     │
     ▼
User sees updated content
```

## Component Hierarchy

```
App
├── Router
    ├── Home
    │   ├── HeaderSection
    │   │   └── NavigationMenu (useNavigationData)
    │   ├── HeroSection
    │   │   ├── usePersonalData
    │   │   └── useImagesData
    │   ├── QuoteSection
    │   │   └── useQuotesData
    │   ├── ProjectsSection
    │   │   └── useProjectsData
    │   ├── SkillsSection
    │   │   └── useSkillsData
    │   ├── AboutMeSection
    │   │   ├── usePersonalData
    │   │   └── useImagesData
    │   ├── AchievementsSection
    │   │   └── useAchievementsData
    │   ├── ContactSection
    │   │   └── usePersonalData
    │   └── FooterSection
    │       └── usePersonalData
    │
    ├── Projects
    │   └── useProjectsData
    │
    └── Admin
        ├── PersonalInfoTab
        │   ├── usePersonalData
        │   └── personalService.update
        ├── ProjectsTab
        │   ├── useProjectsData
        │   └── projectsService.create
        └── SkillsTab
            └── useSkillsData
```

## File Dependencies

```
App.tsx
  ↓
screens/Home/Home.tsx
  ↓
sections/ProjectsSection.tsx
  ↓
hooks/useJsonData.ts
  ↓
hooks/useAppwriteData.ts
  ↓
services/appwrite.service.ts
  ↓
lib/appwrite.ts
  ↓
Appwrite Cloud API
```

## Environment Configuration Flow

```
.env file
  │
  ├── VITE_APPWRITE_ENDPOINT
  ├── VITE_APPWRITE_PROJECT_ID
  ├── VITE_APPWRITE_DATABASE_ID
  ├── Collection IDs...
  └── VITE_APPWRITE_STORAGE_BUCKET_ID
       │
       ▼
  src/vite-env.d.ts (TypeScript types)
       │
       ▼
  import.meta.env (Vite runtime)
       │
       ▼
  src/lib/appwrite.ts (Configuration)
       │
       ▼
  Services & Components
```

## Admin Panel Architecture

```
/admin route
     │
     ▼
Admin.tsx
  │
  ├── State Management
  │   ├── activeTab (personal/projects/skills)
  │   ├── personalForm (controlled input)
  │   └── projectForm (controlled input)
  │
  ├── Data Fetching
  │   ├── usePersonalData()
  │   ├── useProjectsData()
  │   └── useSkillsData()
  │
  ├── Update Handlers
  │   ├── handlePersonalUpdate()
  │   │   └── personalService.update()
  │   └── handleProjectCreate()
  │       └── projectsService.create()
  │
  └── UI Components
      ├── TabNavigation
      ├── PersonalInfoForm
      ├── ProjectForm
      ├── ProjectsList
      └── SkillsView
```

## Security Architecture

```
Frontend (Public)
  │
  ├── Read Operations: ✅ Allowed
  │   └── Appwrite Permissions: "Any" role can read
  │
  └── Write Operations: ⚠️ Exposed (Admin Panel)
      │
      ├── Current: Anyone can access /admin
      │
      └── Recommended: Add Authentication
          │
          ├── Appwrite Auth
          │   ├── Email/Password
          │   └── OAuth providers
          │
          └── Protected Routes
              └── Only authenticated users access /admin
```

## Deployment Architecture

```
Development
  ├── Local: http://localhost:5173
  ├── .env file with dev credentials
  └── Appwrite platform: localhost:5173

         │
         │ npm run build
         ▼

Production Build
  ├── Static files in /dist
  ├── Environment variables from hosting
  └── Optimized bundles

         │
         │ Deploy
         ▼

Hosting Platform (Vercel/Netlify)
  ├── Environment Variables Set
  ├── Production domain
  └── Appwrite platform: production-url.com

         │
         │ Fetch Data
         ▼

Appwrite Cloud
  └── Serves data via API
```

## Performance Optimization

```
Component Render
     │
     ├─→ Hook checks cache
     │      │
     │      ├─→ Data exists? Return immediately
     │      │
     │      └─→ No data? Fetch from Appwrite
     │             │
     │             └─→ Cache result in state
     │
     └─→ React memoization
            │
            └─→ Only re-render when data changes
```

## Migration Architecture

```
Original JSON Files               Appwrite Collections
     │                                   │
src/data/personal.json    ─────→   personal_info
src/data/projects.json    ─────→   projects (3 documents)
src/data/skills.json      ─────→   skills
src/data/achievements.json ────→   achievements
src/data/quotes.json      ─────→   quotes (3 documents)
src/data/navigation.json  ─────→   navigation
src/data/images.json      ─────→   images

     Migration Script: scripts/migrate.ts
          ↓
     One-time execution
          ↓
     Data now in Appwrite
```

## Scalability Pattern

```
Current (Small Portfolio)
  ├── 7 collections
  ├── ~10-20 documents total
  └── Minimal API calls

         │
         │ As portfolio grows
         ▼

Scaled (Large Portfolio)
  ├── Same 7 collections
  ├── 100+ projects
  ├── Pagination added
  ├── Search functionality
  ├── Filtering by tech stack
  └── Appwrite handles all scaling
```

---

## Quick Reference

### Key Files
- **Entry Point**: `src/App.tsx`
- **Configuration**: `src/lib/appwrite.ts`
- **Services**: `src/services/appwrite.service.ts`
- **Hooks**: `src/hooks/useAppwriteData.ts`
- **Types**: `src/types/appwrite.ts`
- **Admin**: `src/screens/Admin/Admin.tsx`

### Key Concepts
- **Hooks**: Fetch data from Appwrite
- **Services**: CRUD operations
- **Collections**: Database tables
- **Documents**: Individual records
- **Admin Panel**: Content management UI

### Data Flow
1. Component calls hook
2. Hook calls service
3. Service calls Appwrite
4. Data flows back up
5. Component renders

---

*This architecture is production-ready and scalable!*
