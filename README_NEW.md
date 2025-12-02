# Portfolio Website with Appwrite Backend

A modern, dynamic portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, and **Appwrite** as the backend.

## 🚀 Features

- ✅ **Dynamic Content Management** - Update portfolio content without redeploying
- ✅ **Appwrite Integration** - Powerful BaaS for data storage and management
- ✅ **Admin Panel** - Manage projects and personal info at `/admin`
- ✅ **Modern UI** - Cyberpunk-themed design with Shadcn UI components
- ✅ **Responsive Design** - Works on all devices
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Fast Performance** - Built with Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- Appwrite account (Appwrite Pro recommended)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd null
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your Appwrite credentials:
   ```env
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   # ... other variables
   ```

4. **Set up Appwrite**
   
   Follow the detailed setup guide in [SETUP.md](./SETUP.md) to:
   - Create your Appwrite project
   - Set up database and collections
   - Configure permissions

5. **Run the migration script**
   ```bash
   npx tsx scripts/migrate.ts
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── src/
│   ├── components/       # UI components (Shadcn)
│   ├── data/            # JSON data files (legacy)
│   ├── hooks/           # React hooks including Appwrite hooks
│   ├── lib/             # Utilities and Appwrite config
│   ├── screens/         # Page components
│   │   ├── Home/
│   │   ├── Projects/
│   │   └── Admin/       # Admin panel
│   ├── services/        # Appwrite services
│   └── types/           # TypeScript type definitions
├── scripts/
│   └── migrate.ts       # Data migration script
├── .env                 # Environment variables
├── SETUP.md            # Detailed Appwrite setup guide
└── README.md
```

## 🔧 Configuration

### Environment Variables

All Appwrite configuration is done through environment variables:

- `VITE_APPWRITE_ENDPOINT` - Appwrite API endpoint
- `VITE_APPWRITE_PROJECT_ID` - Your project ID
- `VITE_APPWRITE_DATABASE_ID` - Database ID
- Collection IDs for each data type
- Storage bucket ID

See `.env.example` for the complete list.

## 📊 Data Structure

### Collections

1. **personal_info** - Your personal information, bio, contact details
2. **projects** - Portfolio projects with tech stack and links
3. **skills** - Technical skills organized by category
4. **achievements** - Certifications and accomplishments
5. **quotes** - Inspirational quotes
6. **navigation** - Menu structure
7. **images** - Image metadata

## 🎨 Admin Panel

Access the admin panel at `/admin` to:

- ✏️ Update personal information
- ➕ Add new projects
- 👀 View existing content
- 🔄 Real-time updates

For advanced editing, use the [Appwrite Console](https://cloud.appwrite.io).

## 🚀 Deployment

### Build for production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables in the platform
3. Deploy!

**Important:** Don't forget to add your production domain to Appwrite's Web Platforms.

## 🔄 Migration from JSON to Appwrite

The project includes both JSON files and Appwrite integration. The hooks in `useJsonData.ts` now automatically use Appwrite data.

**Migration steps:**
1. Set up Appwrite (see SETUP.md)
2. Run migration script
3. Test locally
4. Deploy

**Rollback:** If needed, the old JSON files are still available as fallback.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npx tsx scripts/migrate.ts` - Migrate JSON data to Appwrite

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Md Habibullah Mahmud**
- GitHub: [@mdhabibullahmahmudncs13](https://github.com/mdhabibullahmahmudncs13)
- LinkedIn: [Md Habibullah Mahmud](https://www.linkedin.com/in/md-habibullah-mahmud-2423841a5/)

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io) - Backend as a Service
- [Shadcn UI](https://ui.shadcn.com) - UI Components
- [Vite](https://vitejs.dev) - Build Tool
- [React](https://react.dev) - UI Framework

---

Made with ❤️ by Md Habibullah Mahmud
