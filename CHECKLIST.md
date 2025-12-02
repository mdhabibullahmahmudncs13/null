# ✅ Appwrite Setup Checklist

Use this checklist to ensure your Appwrite integration is set up correctly.

## 📋 Pre-Setup

- [ ] Node.js installed (v18+)
- [ ] Git repository initialized
- [ ] Appwrite Pro account ready
- [ ] Code editor open (VS Code recommended)

## 🎯 Step-by-Step Setup

### 1. Install Dependencies ✓
```bash
npm install
```
**Verify:** Check `package.json` includes `appwrite` dependency

- [ ] Dependencies installed successfully
- [ ] No errors in terminal

---

### 2. Create Appwrite Project

**Go to:** https://cloud.appwrite.io

- [ ] Created new project
- [ ] Copied Project ID: `____________________`
- [ ] Project name: `____________________`

---

### 3. Add Web Platform

**In Appwrite Console:** Settings > Platforms > Add Platform > Web

- [ ] Added development URL: `http://localhost:5173`
- [ ] Added production URL: `____________________`

---

### 4. Create Database

**In Appwrite Console:** Databases > Create Database

- [ ] Database created
- [ ] Database name: `portfolio`
- [ ] Copied Database ID: `____________________`

---

### 5. Create Collections

Create each collection with proper attributes (see SETUP.md for details):

- [ ] **Collection 1:** `personal_info` (ID: `____________________`)
- [ ] **Collection 2:** `projects` (ID: `____________________`)
- [ ] **Collection 3:** `skills` (ID: `____________________`)
- [ ] **Collection 4:** `achievements` (ID: `____________________`)
- [ ] **Collection 5:** `quotes` (ID: `____________________`)
- [ ] **Collection 6:** `navigation` (ID: `____________________`)
- [ ] **Collection 7:** `images` (ID: `____________________`)

**For each collection:**
- [ ] Created all required attributes
- [ ] Set permissions: Read = Anyone
- [ ] Created indexes (where needed)

---

### 6. Create Storage Bucket

**In Appwrite Console:** Storage > Create Bucket

- [ ] Bucket created
- [ ] Bucket name: `portfolio_media`
- [ ] Copied Bucket ID: `____________________`
- [ ] Set permissions: Read = Anyone

---

### 7. Configure Environment Variables

**Edit `.env` file:**

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=__________________ ✓
VITE_APPWRITE_DATABASE_ID=__________________ ✓

VITE_APPWRITE_PERSONAL_COLLECTION_ID=personal_info
VITE_APPWRITE_PROJECTS_COLLECTION_ID=projects
VITE_APPWRITE_SKILLS_COLLECTION_ID=skills
VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID=achievements
VITE_APPWRITE_QUOTES_COLLECTION_ID=quotes
VITE_APPWRITE_NAVIGATION_COLLECTION_ID=navigation
VITE_APPWRITE_IMAGES_COLLECTION_ID=images

VITE_APPWRITE_STORAGE_BUCKET_ID=portfolio_media
```

- [ ] All IDs filled in
- [ ] File saved
- [ ] `.env` added to `.gitignore`

---

### 8. Test Connection

```bash
npm run appwrite:test
```

**Expected Output:**
```
✅ Appwrite client initialized
✅ Database connected!
✅ Personal Info: 0 document(s)
✅ Projects: 0 document(s)
...
```

- [ ] Connection test passed
- [ ] No error messages
- [ ] All collections accessible

---

### 9. Migrate Data

```bash
npm run appwrite:migrate
```

**Expected Output:**
```
🚀 Starting migration to Appwrite...
✅ Personal Info migrated
✅ All projects migrated
✅ Skills migrated
...
🎉 Migration completed successfully!
```

- [ ] Migration successful
- [ ] All data transferred
- [ ] No errors in console

---

### 10. Verify Data in Appwrite

**In Appwrite Console:** Check each collection

- [ ] `personal_info`: 1 document
- [ ] `projects`: 3+ documents
- [ ] `skills`: 1 document
- [ ] `achievements`: 1 document
- [ ] `quotes`: 3 documents
- [ ] `navigation`: 1 document
- [ ] `images`: 1 document

---

### 11. Start Development Server

```bash
npm run dev
```

- [ ] Server started successfully
- [ ] No errors in terminal
- [ ] Browser opens at http://localhost:5173

---

### 12. Test Portfolio

**Visit:** http://localhost:5173

- [ ] Homepage loads
- [ ] Personal info displays correctly
- [ ] Projects section shows data
- [ ] Skills section loads
- [ ] Achievements visible
- [ ] No console errors in browser

---

### 13. Test Admin Panel

**Visit:** http://localhost:5173/admin

- [ ] Admin page loads
- [ ] Personal info tab works
- [ ] Projects tab shows data
- [ ] Skills tab displays
- [ ] Can view existing projects

---

### 14. Test Updates

**Try updating something:**

1. Go to admin panel
2. Update your name
3. Click "Update Personal Info"
4. Refresh homepage

- [ ] Update successful (toast notification)
- [ ] Changes reflected on homepage
- [ ] Changes saved in Appwrite Console

---

## 🚀 Production Deployment

### Pre-Deployment

- [ ] All local tests passed
- [ ] Production domain ready
- [ ] Hosting platform chosen (Vercel/Netlify)

### Deployment Steps

1. **Add Production Domain to Appwrite**
   - [ ] Added to Web Platforms in Appwrite Console

2. **Set Environment Variables**
   - [ ] All Appwrite credentials added to hosting platform
   - [ ] Variables match local `.env`

3. **Build & Deploy**
   ```bash
   npm run build
   ```
   - [ ] Build successful
   - [ ] Deployed to production
   - [ ] Site accessible

4. **Test Production**
   - [ ] Homepage loads
   - [ ] Data displays correctly
   - [ ] Admin panel works
   - [ ] Can update content

---

## 🎯 Final Verification

### Functionality

- [ ] All pages load without errors
- [ ] Data fetches from Appwrite
- [ ] Admin panel fully functional
- [ ] Updates reflect in real-time
- [ ] Images display correctly
- [ ] Links work properly

### Performance

- [ ] Page loads quickly
- [ ] No console errors
- [ ] No network errors
- [ ] Lighthouse score acceptable

### Security

- [ ] `.env` not in git
- [ ] API keys secure
- [ ] Permissions set correctly
- [ ] CORS configured properly

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to Appwrite"
- [ ] Check Project ID in `.env`
- [ ] Verify domain in Web Platforms
- [ ] Restart dev server

### Issue: "Collection not found"
- [ ] Verify collection IDs in `.env`
- [ ] Check collection exists in Appwrite Console
- [ ] Ensure permissions are set

### Issue: "No data showing"
- [ ] Run migration script again
- [ ] Check data in Appwrite Console
- [ ] Verify collection permissions

### Issue: "CORS error"
- [ ] Add domain to Web Platforms
- [ ] Clear browser cache
- [ ] Restart application

---

## 📚 Resources

- [ ] Read QUICKSTART.md
- [ ] Review SETUP.md for details
- [ ] Check APPWRITE_DOCS.md for API usage
- [ ] Bookmark Appwrite Console

---

## ✅ Setup Complete!

When all items are checked, you're ready to:
- 🎨 Customize your portfolio
- 📝 Update content via admin panel
- 🚀 Deploy to production
- 📊 Track with analytics (optional)

---

**Date Completed:** _______________

**Notes:**
_________________________________________________
_________________________________________________
_________________________________________________

---

**Need Help?**
- 📖 Check documentation files
- 💬 Appwrite Discord: https://discord.com/invite/appwrite
- 📚 Appwrite Docs: https://appwrite.io/docs

**Congratulations! Your portfolio is now powered by Appwrite!** 🎉
