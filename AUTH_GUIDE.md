# 🔐 Admin Authentication Guide

## Overview

Your admin panel is now **protected with Appwrite Authentication**. Only authenticated users can access `/admin` and perform CRUD operations.

## 🎯 Features

✅ **Secure Login** - Email/password authentication  
✅ **Protected Routes** - Admin panel requires authentication  
✅ **Session Management** - Stay logged in across page refreshes  
✅ **Logout Functionality** - Secure session termination  
✅ **CRUD Operations** - Only authenticated admins can create, update, delete content  

## 🚀 Quick Start

### Step 1: Create Admin User

Run the admin creation script:

```bash
npm run appwrite:create-admin
```

You'll be prompted for:
- Full Name
- Email
- Password (minimum 8 characters)

**Example:**
```
🔐 Admin User Creation

Please enter admin details:

Full Name: John Doe
Email: admin@example.com
Password (min 8 characters): ********

⏳ Creating admin user...

✅ Admin user created successfully!
```

### Step 2: Start Your App

```bash
npm run dev
```

### Step 3: Login

1. Navigate to: `http://localhost:5173/login`
2. Enter your credentials
3. Click "Login"

### Step 4: Access Admin Panel

After successful login, you'll be redirected or can visit:
```
http://localhost:5173/admin
```

## 📋 User Management

### Create Admin User via Appwrite Console

Alternatively, create users directly in Appwrite Console:

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project
3. Go to **Auth** > **Users**
4. Click **Add User**
5. Fill in details:
   - Email
   - Password
   - Name (optional)
6. Click **Create**

### Multiple Admin Users

You can create multiple admin users:

```bash
# Run the script multiple times with different emails
npm run appwrite:create-admin
```

Or create them via Appwrite Console.

## 🔒 Security Features

### Protected Routes

The `/admin` route is protected by the `ProtectedRoute` component:

```typescript
// Unauthorized users are redirected to /login
<Route path="/admin" element={
  <ProtectedRoute>
    <Admin />
  </ProtectedRoute>
} />
```

### Session Persistence

- Sessions persist across page refreshes
- Uses Appwrite's built-in session management
- Secure HTTP-only cookies

### Automatic Logout

Sessions expire based on Appwrite's default settings (30 days).

## 🎨 Login Page

The login page features:
- Cyberpunk theme matching your portfolio
- Form validation
- Error handling with toast notifications
- Loading states
- Responsive design

**URL:** `http://localhost:5173/login`

## 🛠️ Admin Panel Features

Once logged in, admins can:

### ✅ Personal Info
- ✏️ Edit name, title, email
- 💾 Update bio and description
- 📞 Manage contact information

### ✅ Projects
- ➕ Create new projects
- 👀 View all projects
- 🗑️ Delete projects
- 📝 Edit project details

### ✅ Skills
- 👁️ View skills by category
- (Edit via Appwrite Console for complex updates)

### 🚪 Logout
- Click "Logout" button in header
- Securely ends session
- Redirects to login page

## 🔧 Technical Details

### Authentication Flow

```
User visits /admin
     ↓
Not authenticated?
     ↓
Redirect to /login
     ↓
User enters credentials
     ↓
authService.login()
     ↓
Appwrite creates session
     ↓
User stored in AuthContext
     ↓
Redirect to /admin
     ↓
Access granted!
```

### Files Structure

```
src/
├── services/
│   └── auth.service.ts          # Authentication methods
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── components/
│   └── ProtectedRoute.tsx       # Route protection
└── screens/
    ├── Login/
    │   ├── Login.tsx            # Login page
    │   └── index.ts
    └── Admin/
        └── Admin.tsx            # Protected admin panel
```

### Auth Service API

```typescript
import { authService } from './services/auth.service';

// Login
await authService.login(email, password);

// Get current user
const user = await authService.getCurrentUser();

// Check authentication
const isAuth = await authService.isAuthenticated();

// Logout
await authService.logout();
```

### Using Auth in Components

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Welcome, {user?.email}</div>;
  }
  
  return <LoginForm onSubmit={login} />;
}
```

## 🌐 Production Setup

### Environment Variables

No additional environment variables needed! Uses existing Appwrite config.

### CORS Configuration

Ensure your production domain is added to Appwrite Web Platforms:

1. Appwrite Console → Your Project
2. Settings → Platforms → Web
3. Add your production URL

### Creating Production Admin

After deploying:

1. Visit: `https://yourdomain.com/login`
2. Or create user via Appwrite Console
3. Login and manage content

## 🐛 Troubleshooting

### "Invalid credentials" error

**Check:**
- Email is correct
- Password is at least 8 characters
- User exists in Appwrite Console

**Fix:**
```bash
# Create new admin
npm run appwrite:create-admin
```

### Stuck on login page after correct credentials

**Check:**
- Browser console for errors
- Network tab for API failures
- Appwrite project ID in `.env`

**Fix:**
1. Clear browser cache
2. Check `.env` configuration
3. Verify Appwrite project is active

### "Session expired" message

**Fix:**
- Simply login again
- Sessions last 30 days by default

### Can't access admin panel

**Check:**
1. Are you logged in?
2. Does user exist in Appwrite?
3. Any console errors?

**Fix:**
```bash
# Test connection
npm run appwrite:test

# Verify auth setup
# Check Appwrite Console → Auth → Users
```

### Redirect loop

**Fix:**
1. Clear browser cookies
2. Logout explicitly
3. Clear local storage
4. Login again

## 📱 Mobile & Responsive

The login page and admin panel are fully responsive:
- ✅ Mobile-friendly forms
- ✅ Touch-optimized buttons
- ✅ Adaptive layouts

## 🔐 Security Best Practices

### Password Requirements
- Minimum 8 characters
- Recommended: 
  - Mix of uppercase/lowercase
  - Include numbers
  - Add special characters

### Admin Account Security
- Use strong, unique passwords
- Don't share credentials
- Logout when done
- Monitor Appwrite Console for suspicious activity

### Production Recommendations
1. Enable 2FA in Appwrite Console (if available)
2. Use environment-specific admin accounts
3. Regular password rotation
4. Monitor auth logs

## 🎯 Next Steps

### Current Setup ✅
- [x] Email/password authentication
- [x] Protected admin routes
- [x] Session management
- [x] Logout functionality

### Future Enhancements 🔮
- [ ] OAuth providers (Google, GitHub)
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Role-based access control
- [ ] Audit logs

## 📚 Additional Resources

- [Appwrite Auth Docs](https://appwrite.io/docs/client/account)
- [Security Best Practices](https://appwrite.io/docs/security)
- [Session Management](https://appwrite.io/docs/client/account#sessions)

## 🆘 Need Help?

1. **Check Appwrite Console** - Auth → Users
2. **Browser Console** - Look for error messages
3. **Network Tab** - Check API calls
4. **Appwrite Discord** - Community support
5. **Documentation** - This guide!

---

## 📝 Quick Commands

```bash
# Create admin user
npm run appwrite:create-admin

# Start dev server
npm run dev

# Test connection
npm run appwrite:test
```

---

## 🎉 You're Protected!

Your admin panel is now secure with professional authentication. Only authorized users can manage your portfolio content!

**Login URL:** `http://localhost:5173/login`  
**Admin URL:** `http://localhost:5173/admin` (requires login)

---

*Last updated: December 2, 2025*
