# Appwrite Setup Guide

This guide will help you set up Appwrite for your portfolio.

## Prerequisites

- Appwrite Pro account
- Node.js installed

## Step 1: Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Note your **Project ID**

## Step 2: Create Database

1. In your project, go to **Databases**
2. Click **Create Database**
3. Name it: `portfolio`
4. Note your **Database ID**

## Step 3: Create Collections

Create the following collections with these attributes:

### Collection 1: `personal_info`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| name | String | 255 | Yes | No |
| shortName | String | 255 | Yes | No |
| title | String | 255 | Yes | No |
| subtitle | String | 255 | Yes | No |
| description | String | 1000 | Yes | No |
| email | String | 255 | Yes | No |
| currentWork | String | 255 | Yes | No |
| bio | String | 10000 | Yes | No |
| contact | String | 5000 | Yes | No |
| socialLinks | String | 5000 | Yes | No |
| footer | String | 5000 | Yes | No |

### Collection 2: `projects`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| id | Integer | - | Yes | No |
| title | String | 255 | Yes | No |
| description | String | 2000 | Yes | No |
| image | String | 500 | Yes | No |
| technologies | String | 100 | Yes | Yes |
| liveUrl | String | 500 | Yes | No |
| codeUrl | String | 500 | Yes | No |
| featured | Boolean | - | No | No |
| order | Integer | - | No | No |
| actions | String | 5000 | Yes | No |

**Indexes:**
- `order_asc`: order ASC
- `featured`: featured DESC, order ASC

### Collection 3: `skills`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| sectionTitle | String | 255 | Yes | No |
| categories | String | 10000 | Yes | No |

### Collection 4: `achievements`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| sectionTitle | String | 255 | Yes | No |
| categories | String | 20000 | Yes | No |

### Collection 5: `quotes`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| text | String | 1000 | Yes | No |
| author | String | 255 | Yes | No |
| order | Integer | - | No | No |

**Indexes:**
- `order_asc`: order ASC

### Collection 6: `navigation`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| logo | String | 1000 | Yes | No |
| menuItems | String | 5000 | Yes | No |
| languages | String | 2000 | Yes | No |

### Collection 7: `images`
**Permissions:** Read access to Anyone

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| hero | String | 2000 | Yes | No |
| about | String | 2000 | Yes | No |
| decorative | String | 5000 | Yes | No |

## Step 4: Create Storage Bucket

1. Go to **Storage**
2. Click **Create Bucket**
3. Name it: `portfolio_media`
4. Set permissions: Read access to Anyone
5. Note your **Bucket ID**

## Step 5: Configure Environment Variables

Update your `.env` file with your credentials:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here

VITE_APPWRITE_PERSONAL_COLLECTION_ID=personal_info
VITE_APPWRITE_PROJECTS_COLLECTION_ID=projects
VITE_APPWRITE_SKILLS_COLLECTION_ID=skills
VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID=achievements
VITE_APPWRITE_QUOTES_COLLECTION_ID=quotes
VITE_APPWRITE_NAVIGATION_COLLECTION_ID=navigation
VITE_APPWRITE_IMAGES_COLLECTION_ID=images

VITE_APPWRITE_STORAGE_BUCKET_ID=portfolio_media
```

## Step 6: Run Migration Script

**Note:** The migration script needs to be run with Node.js directly (not through npm scripts yet).

Install tsx for TypeScript execution:
```bash
npm install -D tsx
```

Run the migration:
```bash
npx tsx scripts/migrate.ts
```

## Step 7: Upload Images to Storage (Optional)

For better performance, upload your images to Appwrite Storage:

1. Go to **Storage** > `portfolio_media`
2. Upload your images
3. Update the image paths in your documents to use Appwrite URLs

Example URL format:
```
https://cloud.appwrite.io/v1/storage/buckets/[BUCKET_ID]/files/[FILE_ID]/view?project=[PROJECT_ID]
```

## Step 8: Test Your Application

```bash
npm run dev
```

Your portfolio should now be powered by Appwrite! 🎉

## Troubleshooting

### CORS Errors
1. Go to your Appwrite project settings
2. Add your development URL (e.g., `http://localhost:5173`) to the Web Platforms
3. Add your production URL when deploying

### Permission Errors
Ensure all collections have "Read" permission set to "Any" role in the Permissions tab.

### Data Not Showing
1. Check browser console for errors
2. Verify environment variables are correct
3. Ensure collections have data (check Appwrite Console)

## Admin Panel

After successful migration, you can use the Appwrite Console to manage your content, or check the admin panel at `/admin` route (if implemented).
