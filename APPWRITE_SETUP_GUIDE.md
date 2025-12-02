# 🚀 Appwrite Setup Guide

Complete step-by-step guide to set up Appwrite for your portfolio website.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Appwrite Account](#1-create-appwrite-account)
3. [Create New Project](#2-create-new-project)
4. [Create Database](#3-create-database)
5. [Create Collections](#4-create-collections)
6. [Configure Environment Variables](#5-configure-environment-variables)
7. [Migrate Data](#6-migrate-data)
8. [Create Admin User](#7-create-admin-user)
9. [Test Everything](#8-test-everything)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ Appwrite Pro account (or Free tier)
- ✅ Node.js installed (v18 or higher)
- ✅ Project dependencies installed (`npm install`)
- ✅ Basic understanding of JSON and databases

**Estimated Time**: 30-45 minutes

---

## 1. Create Appwrite Account

### Step 1.1: Sign Up

1. Visit [Appwrite Cloud](https://cloud.appwrite.io)
2. Click **"Sign Up"** or **"Get Started"**
3. Choose your signup method:
   - Email & Password
   - GitHub OAuth
   - GitLab OAuth
   - Bitbucket OAuth

### Step 1.2: Verify Email

1. Check your email inbox
2. Click the verification link
3. Complete email verification

### Step 1.3: Access Console

1. Log in to [Appwrite Console](https://cloud.appwrite.io/console)
2. You should see the dashboard

**✅ Checkpoint**: You're logged into Appwrite Console

---

## 2. Create New Project

### Step 2.1: Create Project

1. In Appwrite Console, click **"Create Project"**
2. Enter project details:
   - **Name**: `Portfolio` (or your preferred name)
   - **Project ID**: Auto-generated (or custom)
3. Click **"Create"**

### Step 2.2: Copy Project ID

1. After creation, you'll see project overview
2. **Copy the Project ID** - you'll need this later
   - Example: `67a1b2c3d4e5f6789`

### Step 2.3: Configure Platform (Optional)

1. Click **"Settings"** in left sidebar
2. Click **"Platforms"**
3. Add your website:
   - **Type**: Web
   - **Name**: `Portfolio Website`
   - **Hostname**: `localhost` (for development)
   - Add production domain later: `yourdomain.com`

**✅ Checkpoint**: Project created, Project ID copied

---

## 3. Create Database

### Step 3.1: Navigate to Databases

1. In left sidebar, click **"Databases"**
2. Click **"Create Database"**

### Step 3.2: Create Database

1. Enter database details:
   - **Database ID**: `portfolio_db` (or custom)
   - **Name**: `Portfolio Database`
2. Click **"Create"**

### Step 3.3: Copy Database ID

1. After creation, **copy the Database ID**
   - Example: `portfolio_db`

**✅ Checkpoint**: Database created, Database ID copied

---

## 4. Create Collections

You need to create **7 collections**. Follow this process for each:

### Collection 1: Personal Info

#### Step 4.1.1: Create Collection

1. Click **"Create Collection"**
2. Enter details:
   - **Collection ID**: `personal_info`
   - **Name**: `Personal Info`
3. Click **"Create"**

#### Step 4.1.2: Configure Permissions

1. Go to **"Settings"** tab
2. Under **"Permissions"**, add:
   - **Role**: `Any`
   - **Permission**: `Read` ✅
3. Click **"Create"**

#### Step 4.1.3: Create Attributes

Click **"Attributes"** tab, then add each attribute:

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `name` | String | 100 | ✅ | ❌ | - |
| `title` | String | 200 | ✅ | ❌ | - |
| `email` | String | 100 | ✅ | ❌ | - |
| `phone` | String | 20 | ❌ | ❌ | - |
| `bio` | String | 1000 | ❌ | ❌ | - |
| `location` | String | 100 | ❌ | ❌ | - |
| `github` | String | 200 | ❌ | ❌ | - |
| `linkedin` | String | 200 | ❌ | ❌ | - |
| `twitter` | String | 200 | ❌ | ❌ | - |
| `website` | String | 200 | ❌ | ❌ | - |
| `resume` | String | 200 | ❌ | ❌ | - |
| `footerText` | String | 500 | ❌ | ❌ | - |

**How to add an attribute:**
1. Click **"Create Attribute"**
2. Select **"String"**
3. Enter **Key** (e.g., `name`)
4. Enter **Size** (e.g., `100`)
5. Check **Required** if needed
6. Click **"Create"**
7. Wait for attribute to be created (green checkmark)

**✅ Checkpoint**: Personal Info collection created with 12 attributes

---

### Collection 2: Projects

#### Step 4.2.1: Create Collection

1. Click **"Create Collection"**
2. Enter details:
   - **Collection ID**: `projects`
   - **Name**: `Projects`
3. Click **"Create"**

#### Step 4.2.2: Configure Permissions

1. Go to **"Settings"** tab
2. Under **"Permissions"**, add:
   - **Role**: `Any`
   - **Permission**: `Read` ✅

#### Step 4.2.3: Create Attributes

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `title` | String | 200 | ✅ | ❌ | - |
| `description` | String | 2000 | ✅ | ❌ | - |
| `longDescription` | String | 5000 | ❌ | ❌ | - |
| `image` | String | 500 | ❌ | ❌ | - |
| `images` | String | 100 | ❌ | ✅ | - |
| `technologies` | String | 50 | ❌ | ✅ | - |
| `github` | String | 200 | ❌ | ❌ | - |
| `demo` | String | 200 | ❌ | ❌ | - |
| `featured` | Boolean | - | ❌ | ❌ | false |
| `order` | Integer | - | ❌ | ❌ | 0 |
| `category` | String | 100 | ❌ | ❌ | - |
| `tags` | String | 50 | ❌ | ✅ | - |
| `status` | String | 50 | ❌ | ❌ | active |
| `startDate` | String | 50 | ❌ | ❌ | - |
| `endDate` | String | 50 | ❌ | ❌ | - |

**Note**: For array attributes, check the **"Array"** checkbox when creating.

**✅ Checkpoint**: Projects collection created with 15 attributes

---

### Collection 3: Skills

#### Step 4.3.1: Create Collection

1. Click **"Create Collection"**
2. Enter details:
   - **Collection ID**: `skills`
   - **Name**: `Skills`

#### Step 4.3.2: Configure Permissions

- **Role**: `Any`
- **Permission**: `Read` ✅

#### Step 4.3.3: Create Attributes

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `frontend` | String | 50 | ❌ | ✅ | - |
| `backend` | String | 50 | ❌ | ✅ | - |
| `database` | String | 50 | ❌ | ✅ | - |
| `tools` | String | 50 | ❌ | ✅ | - |
| `languages` | String | 50 | ❌ | ✅ | - |
| `others` | String | 50 | ❌ | ✅ | - |

**✅ Checkpoint**: Skills collection created with 6 array attributes

---

### Collection 4: Achievements

#### Step 4.4.1: Create Collection

1. Collection ID: `achievements`
2. Name: `Achievements`

#### Step 4.4.2: Configure Permissions

- **Role**: `Any`
- **Permission**: `Read` ✅

#### Step 4.4.3: Create Attributes

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `certifications` | String | 5000 | ❌ | ❌ | - |
| `achievements` | String | 5000 | ❌ | ❌ | - |
| `participation` | String | 5000 | ❌ | ❌ | - |

**Note**: These are JSON strings, so use larger size (5000).

**✅ Checkpoint**: Achievements collection created with 3 attributes

---

### Collection 5: Quotes

#### Step 4.5.1: Create Collection

1. Collection ID: `quotes`
2. Name: `Quotes`

#### Step 4.5.2: Configure Permissions

- **Role**: `Any`
- **Permission**: `Read` ✅

#### Step 4.5.3: Create Attributes

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `text` | String | 500 | ✅ | ❌ | - |
| `author` | String | 100 | ✅ | ❌ | - |
| `order` | Integer | - | ❌ | ❌ | 0 |

**✅ Checkpoint**: Quotes collection created with 3 attributes

---

### Collection 6: Navigation

#### Step 4.6.1: Create Collection

1. Collection ID: `navigation`
2. Name: `Navigation`

#### Step 4.6.2: Configure Permissions

- **Role**: `Any`
- **Permission**: `Read` ✅

#### Step 4.6.3: Create Attributes

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `menuItems` | String | 5000 | ❌ | ❌ | - |
| `logo` | String | 200 | ❌ | ❌ | - |
| `languages` | String | 50 | ❌ | ✅ | - |

**✅ Checkpoint**: Navigation collection created with 3 attributes

---

### Collection 7: Images

#### Step 4.7.1: Create Collection

1. Collection ID: `images`
2. Name: `Images`

#### Step 4.7.2: Configure Permissions

- **Role**: `Any`
- **Permission**: `Read` ✅

#### Step 4.7.3: Create Attributes

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `heroImages` | String | 200 | ❌ | ✅ | - |
| `profileImage` | String | 200 | ❌ | ❌ | - |
| `aboutImage` | String | 200 | ❌ | ❌ | - |
| `decorativeImages` | String | 200 | ❌ | ✅ | - |

**✅ Checkpoint**: Images collection created with 4 attributes

**🎉 All 7 collections created!**

---

## 5. Configure Environment Variables

### Step 5.1: Copy Collection IDs

In Appwrite Console, for each collection:

1. Go to collection
2. Click **"Settings"**
3. Copy the **Collection ID**

### Step 5.2: Update .env File

1. Open `.env` file in your project root
2. Replace with your values:

```env
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=portfolio_db

# Collection IDs
VITE_APPWRITE_PERSONAL_COLLECTION_ID=personal_info
VITE_APPWRITE_PROJECTS_COLLECTION_ID=projects
VITE_APPWRITE_SKILLS_COLLECTION_ID=skills
VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID=achievements
VITE_APPWRITE_QUOTES_COLLECTION_ID=quotes
VITE_APPWRITE_NAVIGATION_COLLECTION_ID=navigation
VITE_APPWRITE_IMAGES_COLLECTION_ID=images

# Storage (optional for now)
VITE_APPWRITE_STORAGE_BUCKET_ID=images_bucket
```

### Step 5.3: Verify Configuration

Run the test script:

```bash
npm run appwrite:test
```

**Expected Output:**
```
✅ Appwrite connection successful!
✅ Database access verified!
```

**✅ Checkpoint**: Environment variables configured and tested

---

## 6. Migrate Data

### Step 6.1: Run Migration Script

Transfer your JSON data to Appwrite:

```bash
npm run appwrite:migrate
```

### Step 6.2: Watch Output

You should see:

```
🚀 Starting Appwrite migration...

📝 Migrating Personal Info...
✅ Personal info migrated successfully!

📁 Migrating Projects...
✅ Project: E-commerce Platform migrated
✅ Project: Task Manager migrated
✅ 5 projects migrated successfully!

🎯 Migrating Skills...
✅ Skills migrated successfully!

🏆 Migrating Achievements...
✅ Achievements migrated successfully!

💬 Migrating Quotes...
✅ Quote 1 migrated
✅ 3 quotes migrated successfully!

🧭 Migrating Navigation...
✅ Navigation migrated successfully!

🖼️ Migrating Images...
✅ Images migrated successfully!

🎉 Migration completed successfully!
```

### Step 6.3: Verify in Console

1. Go to Appwrite Console
2. Navigate to each collection
3. Click **"Documents"** tab
4. Verify data is present

**✅ Checkpoint**: All data migrated to Appwrite

---

## 7. Create Admin User

### Step 7.1: Run Admin Creation Script

```bash
npm run appwrite:create-admin
```

### Step 7.2: Follow Prompts

```
🔐 Appwrite Admin User Creation
================================

Enter admin name: John Doe
Enter admin email: admin@example.com
Enter admin password: ********
Confirm password: ********

✅ Admin user created successfully!

📧 Email: admin@example.com
👤 Name: John Doe
🆔 User ID: 507f1f77bcf86cd799439011

⚠️  IMPORTANT: Save these credentials securely!
```

### Step 7.3: Save Credentials

Store your admin credentials securely:
- Email: `admin@example.com`
- Password: `your_password`

**✅ Checkpoint**: Admin user created

---

## 8. Test Everything

### Step 8.1: Start Development Server

```bash
npm run dev
```

### Step 8.2: Test Homepage

1. Visit: `http://localhost:5173`
2. Verify:
   - Personal info displays
   - Projects show up
   - Skills visible
   - Quotes appear

### Step 8.3: Test Login

1. Visit: `http://localhost:5173/login`
2. Enter admin credentials
3. Should redirect to admin panel

### Step 8.4: Test Admin Panel

1. Visit: `http://localhost:5173/admin`
2. Test tabs:
   - **Personal Info**: View/edit your info
   - **Projects**: See all projects
   - **Skills**: View skills
3. Try creating a new project
4. Try deleting a project (with confirmation)

### Step 8.5: Test Logout

1. Click **"Logout"** button
2. Should redirect to homepage
3. Try accessing `/admin` - should redirect to login

**✅ All tests passed! Your Appwrite integration is working!**

---

## Troubleshooting

### Issue: Connection Failed

**Error**: `AppwriteException: Network request failed`

**Solution**:
1. Check internet connection
2. Verify `VITE_APPWRITE_ENDPOINT` is correct
3. Check `VITE_APPWRITE_PROJECT_ID` matches console

### Issue: Invalid API Key

**Error**: `AppwriteException: Invalid API key`

**Solution**:
1. Verify Project ID in `.env` file
2. Check if project exists in console
3. Ensure no extra spaces in `.env`

### Issue: Collection Not Found

**Error**: `Collection not found`

**Solution**:
1. Verify collection IDs in `.env` match console
2. Check collection was created successfully
3. Ensure permissions are set (Any → Read)

### Issue: Permission Denied

**Error**: `AppwriteException: Unauthorized`

**Solution**:
1. Go to collection → Settings → Permissions
2. Add: Role: `Any`, Permission: `Read`
3. Click "Update"

### Issue: Migration Failed

**Error**: `Failed to migrate data`

**Solution**:
1. Check all collections exist
2. Verify attribute names match exactly
3. Ensure permissions are set correctly
4. Run `npm run appwrite:test` first

### Issue: Admin User Creation Failed

**Error**: `User already exists`

**Solution**:
1. User with that email already exists
2. Use different email
3. Or reset password in Appwrite Console

### Issue: Login Not Working

**Symptoms**: Can't log in to admin panel

**Solution**:
1. Verify admin user was created
2. Check email/password are correct
3. Clear browser cache and cookies
4. Check browser console for errors

### Issue: Data Not Displaying

**Symptoms**: Homepage shows "Loading..." forever

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Verify data exists in Appwrite Console
4. Run `npm run appwrite:test`
5. Check permissions (Any → Read)

### Issue: Can't Access Admin Panel

**Symptoms**: Redirects to login immediately

**Solution**:
1. This is expected if not logged in
2. Login at `/login` first
3. Session may have expired - login again

---

## Quick Reference

### Collection IDs
```
personal_info
projects
skills
achievements
quotes
navigation
images
```

### NPM Scripts
```bash
npm run dev                 # Start dev server
npm run build              # Build for production
npm run appwrite:test      # Test connection
npm run appwrite:migrate   # Migrate data
npm run appwrite:create-admin  # Create admin user
```

### Important URLs
- **Appwrite Console**: https://cloud.appwrite.io/console
- **Development**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Login Page**: http://localhost:5173/login

### Files to Check
- `.env` - Environment variables
- `src/lib/appwrite.ts` - Appwrite config
- `src/services/appwrite.service.ts` - CRUD operations
- `scripts/migrate.ts` - Migration script

---

## Next Steps

After completing setup:

1. ✅ **Customize Content**: Update your info in admin panel
2. ✅ **Add Projects**: Showcase your work
3. ✅ **Upload Images**: Add to Appwrite Storage (future)
4. ✅ **Deploy**: Push to production
5. ✅ **Monitor**: Check Appwrite Console analytics

---

## Production Deployment

### Before Deploying:

1. **Update .env for production**:
   ```env
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_prod_project_id
   ```

2. **Add production domain** in Appwrite Console:
   - Settings → Platforms → Add Platform
   - Type: Web
   - Hostname: `yourdomain.com`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Deploy** to your hosting platform (Vercel, Netlify, etc.)

---

## 🎉 Congratulations!

Your Appwrite-powered portfolio is now fully set up and running!

### What You've Accomplished:

- ✅ Created Appwrite account
- ✅ Set up project and database
- ✅ Created 7 collections with attributes
- ✅ Configured environment variables
- ✅ Migrated all data
- ✅ Created admin user
- ✅ Tested entire system

### You Can Now:

- 🎨 Update content without code changes
- 📝 Manage projects from admin panel
- 🚀 Deploy and update instantly
- 📊 Track usage in Appwrite Console

---

**Need Help?**

- 📚 Check other docs: [DOCS_INDEX.md](./DOCS_INDEX.md)
- 🔧 Quick fixes: [QUICKSTART.md](./QUICKSTART.md)
- 🔐 Auth issues: [AUTH_GUIDE.md](./AUTH_GUIDE.md)
- 💻 API reference: [APPWRITE_DOCS.md](./APPWRITE_DOCS.md)

---

*Setup guide created on December 2, 2025*
*Made with ❤️ for your Appwrite portfolio*
