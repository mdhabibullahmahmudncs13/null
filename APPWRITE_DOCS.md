# Appwrite Integration Documentation

## 📖 Overview

This portfolio is now powered by Appwrite, allowing you to manage content dynamically without redeploying your application.

## 🏗️ Architecture

### Data Flow

```
Appwrite Database → Services → Hooks → Components
                                  ↓
                           Admin Panel (CRUD)
```

### File Structure

```
src/
├── lib/
│   └── appwrite.ts           # Appwrite client configuration
├── services/
│   └── appwrite.service.ts   # CRUD operations for each collection
├── hooks/
│   ├── useAppwriteData.ts    # React hooks for data fetching
│   └── useJsonData.ts        # Re-exports Appwrite hooks (backward compatible)
├── types/
│   └── appwrite.ts           # TypeScript interfaces
└── contexts/
    └── AppwriteContext.tsx   # Optional context provider for app-wide state
```

## 🔧 Services

### Personal Service
```typescript
import { personalService } from './services/appwrite.service';

// Get personal info
const info = await personalService.get();

// Update personal info
await personalService.update({ 
  name: 'New Name',
  email: 'new@email.com'
});
```

### Projects Service
```typescript
import { projectsService } from './services/appwrite.service';

// Get all projects
const projects = await projectsService.getAll();

// Get featured projects only
const featured = await projectsService.getFeatured();

// Create new project
await projectsService.create({
  id: Date.now(),
  title: 'My Project',
  description: 'Description',
  // ... other fields
});

// Update project
await projectsService.update(projectId, { title: 'Updated Title' });

// Delete project
await projectsService.delete(projectId);
```

### Other Services
- `skillsService` - Manage skills
- `achievementsService` - Manage achievements
- `quotesService` - Manage quotes
- `navigationService` - Manage navigation
- `imagesService` - Manage image metadata

## 🪝 Hooks

### Using Appwrite Hooks in Components

```typescript
import { usePersonalData, useProjectsData } from '../hooks/useJsonData';

function MyComponent() {
  const personalData = usePersonalData();
  const projectsData = useProjectsData();

  if (!personalData) return <div>Loading...</div>;

  return <div>{personalData.name}</div>;
}
```

### Available Hooks
- `usePersonalData()` - Personal information
- `useProjectsData()` - All projects
- `useSkillsData()` - Skills data
- `useAchievementsData()` - Achievements
- `useQuotesData()` - All quotes
- `useNavigationData()` - Navigation menu
- `useImagesData()` - Image paths

## 🎨 Admin Panel

### Accessing the Admin Panel

Navigate to `/admin` in your browser:
- Development: `http://localhost:5173/admin`
- Production: `https://yourdomain.com/admin`

### Features

1. **Personal Info Tab**
   - Edit name, title, email
   - Update bio and contact information

2. **Projects Tab**
   - Add new projects
   - View existing projects
   - Each project includes title, description, tech stack, URLs

3. **Skills Tab**
   - View skills by category
   - Edit directly in Appwrite Console for complex updates

### Adding a New Project via Admin Panel

1. Go to `/admin`
2. Click "Projects" tab
3. Fill in the form:
   - Title
   - Description
   - Image URL (upload to `/public` or use Appwrite Storage)
   - Technologies (comma-separated)
   - Live URL
   - Code URL
4. Click "Create Project"

## 🗄️ Database Schema

### Collections

#### 1. personal_info (Single Document)
```json
{
  "name": "string",
  "shortName": "string",
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "email": "string",
  "currentWork": "string",
  "bio": {
    "greeting": "string",
    "paragraphs": ["string"]
  },
  "contact": {
    "description": "string",
    "methods": [...]
  },
  "socialLinks": [...],
  "footer": {...}
}
```

#### 2. projects (Multiple Documents)
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "image": "string",
  "technologies": ["string"],
  "liveUrl": "string",
  "codeUrl": "string",
  "featured": "boolean",
  "order": "number",
  "actions": [...]
}
```

## 🖼️ Image Management

### Option 1: Static Images (Current)
Place images in `/public` folder:
```
/public/
  ├── project1.png
  ├── certificates/
  │   └── cert1.png
  └── profile.jpg
```

Reference in data:
```json
{
  "image": "/project1.png"
}
```

### Option 2: Appwrite Storage (Recommended)

1. **Upload to Appwrite Storage**
   ```typescript
   import { storage, STORAGE_BUCKET_ID } from './lib/appwrite';
   
   const file = await storage.createFile(
     STORAGE_BUCKET_ID,
     'unique()',
     document.getElementById('file')
   );
   ```

2. **Get Image URL**
   ```typescript
   const imageUrl = storage.getFilePreview(
     STORAGE_BUCKET_ID,
     file.$id,
     400, // width
     300, // height
     'center', // gravity
     100, // quality
   );
   ```

3. **Use in Data**
   ```json
   {
     "image": "https://cloud.appwrite.io/v1/storage/buckets/[BUCKET_ID]/files/[FILE_ID]/view?project=[PROJECT_ID]"
   }
   ```

## 🔐 Security

### Permissions

All collections should have:
- **Read**: Anyone (public access)
- **Create/Update/Delete**: Only through admin panel or Appwrite Console

### Best Practices

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Use environment variables** - All config via `.env`
3. **Validate input** - Admin panel should validate all inputs
4. **Rate limiting** - Appwrite handles this automatically

## 🚀 Deployment

### Environment Variables

Set these in your hosting platform (Vercel/Netlify):

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_PERSONAL_COLLECTION_ID=personal_info
VITE_APPWRITE_PROJECTS_COLLECTION_ID=projects
VITE_APPWRITE_SKILLS_COLLECTION_ID=skills
VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID=achievements
VITE_APPWRITE_QUOTES_COLLECTION_ID=quotes
VITE_APPWRITE_NAVIGATION_COLLECTION_ID=navigation
VITE_APPWRITE_IMAGES_COLLECTION_ID=images
VITE_APPWRITE_STORAGE_BUCKET_ID=portfolio_media
```

### Pre-deployment Checklist

- [ ] Appwrite project created
- [ ] All 7 collections created
- [ ] Permissions set correctly
- [ ] Data migrated
- [ ] Environment variables configured
- [ ] Production domain added to Appwrite Web Platforms
- [ ] Test locally
- [ ] Deploy!

## 🔄 Updates & Maintenance

### Updating Content

**Via Admin Panel:**
- Simple updates: Use `/admin` route
- Instant updates, no deployment needed

**Via Appwrite Console:**
- Complex updates: Use Appwrite Console directly
- More control, supports JSON editing

### Backup

Export your data regularly from Appwrite Console:
1. Go to your collection
2. Click "..." menu
3. Select "Export Collection"
4. Save JSON file

### Restore

Import data:
1. Delete existing documents (if needed)
2. Run migration script with updated JSON
3. Or import via Appwrite Console

## 🐛 Troubleshooting

### Data Not Loading

**Check:**
1. Browser console for errors
2. Network tab for failed requests
3. Environment variables are correct
4. Collections have data

**Fix:**
```bash
# Test connection
npx tsx scripts/test-connection.ts

# Re-run migration if needed
npx tsx scripts/migrate.ts
```

### CORS Errors

**Fix:**
1. Go to Appwrite Console
2. Settings > Platforms
3. Add your domain to Web Platforms

### Permission Errors

**Fix:**
1. Go to collection in Appwrite Console
2. Click "Settings" > "Permissions"
3. Add "Any" role with "Read" permission

## 📚 Advanced Usage

### Creating Custom Hooks

```typescript
import { useState, useEffect } from 'react';
import { projectsService } from '../services/appwrite.service';

export function useProjectById(id: string) {
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    // Custom logic to fetch specific project
  }, [id]);
  
  return project;
}
```

### Real-time Updates

Appwrite supports real-time subscriptions:

```typescript
import { client } from './lib/appwrite';

client.subscribe('databases.[DATABASE_ID].collections.[COLLECTION_ID].documents', response => {
  console.log('Data changed!', response);
  // Refresh your component
});
```

## 🎯 Next Steps

1. **Add Authentication** - Protect admin panel with Appwrite Auth
2. **Image Upload** - Implement file upload to Appwrite Storage
3. **Analytics** - Track views with Appwrite Functions
4. **SEO** - Add meta tags dynamically from Appwrite data
5. **Blog** - Add a blog collection for articles

## 📞 Support

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord](https://discord.com/invite/appwrite)
- [GitHub Issues](https://github.com/your-repo/issues)

---

Happy coding! 🚀
