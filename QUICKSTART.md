# Quick Start Guide

## 🚀 Getting Started with Appwrite

Follow these steps to get your portfolio running with Appwrite:

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Click "Create Project"
3. Name it "Portfolio" (or any name you like)
4. Copy your **Project ID**

### Step 3: Add Web Platform

1. In your project, go to **Settings** > **Platforms**
2. Click **Add Platform** > **Web**
3. Add these URLs:
   - Development: `http://localhost:5173`
   - Production: Your deployed URL (e.g., `https://yourdomain.com`)

### Step 4: Create Database

1. Go to **Databases** in the sidebar
2. Click **Create Database**
3. Name it: `portfolio`
4. Copy your **Database ID**

### Step 5: Set Environment Variables

Copy the example env file:
```bash
cp .env.example .env
```

Edit `.env` and add your IDs:
```env
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
```

### Step 6: Create Collections

**Option A: Manual (Recommended for learning)**
Follow the detailed guide in [SETUP.md](./SETUP.md)

**Option B: Using Appwrite CLI (Advanced)**
```bash
# Install Appwrite CLI
npm install -g appwrite-cli

# Login to Appwrite
appwrite login

# Deploy collections (you'll need to create appwrite.json first)
appwrite deploy
```

### Step 7: Test Connection

Verify everything is set up correctly:
```bash
npx tsx scripts/test-connection.ts
```

### Step 8: Migrate Data

Transfer your JSON data to Appwrite:
```bash
npx tsx scripts/migrate.ts
```

### Step 9: Create Admin User

Set up your first admin account:
```bash
npm run appwrite:create-admin
```

Follow the prompts to enter:
- Full name
- Email
- Password (min 8 characters)

### Step 10: Start Development

```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:5173
- **Login**: http://localhost:5173/login (NEW!)
- **Admin Panel**: http://localhost:5173/admin (requires login)

## 🎯 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npx tsx scripts/test-connection.ts` | Test Appwrite connection |
| `npx tsx scripts/migrate.ts` | Migrate data to Appwrite |
| `npm run appwrite:create-admin` | Create admin user (NEW!) |

## ⚠️ Common Issues

### CORS Error
- Add your domain to Web Platforms in Appwrite Console

### "Collection not found"
- Make sure you created all 7 collections (see SETUP.md)
- Check collection IDs in .env match those in Appwrite

### "Document not found"
- Run the migration script: `npx tsx scripts/migrate.ts`

### Environment variables not working
- Make sure .env file is in the root directory
- Restart your dev server after changing .env
- Variables must start with `VITE_`

### Can't access admin panel
- Make sure you've created an admin user: `npm run appwrite:create-admin`
- Login at: `http://localhost:5173/login`
- Check [AUTH_GUIDE.md](./AUTH_GUIDE.md) for detailed instructions

## 📚 Additional Resources

- [Full Setup Guide](./SETUP.md) - Detailed Appwrite configuration
- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord](https://discord.com/invite/appwrite) - Get help from the community

## 🎉 You're All Set!

Once you complete these steps, your portfolio will be:
- ✅ Connected to Appwrite
- ✅ Dynamically managed
- ✅ Ready to deploy
- ✅ Editable via admin panel

Need help? Check [SETUP.md](./SETUP.md) for detailed instructions!
