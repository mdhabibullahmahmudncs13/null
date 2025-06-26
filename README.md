# Portfolio Website with JSON Data Management

This is a modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. All content is managed through JSON files, making it easy to update without touching the code.

## Features

- **JSON-Driven Content**: All website content is stored in JSON files for easy updates
- **Responsive Design**: Optimized for all device sizes
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS
- **Component-Based Architecture**: Modular and maintainable code structure
- **Smooth Animations**: Subtle animations and transitions
- **Contact Form**: Functional contact form with validation

## JSON Data Structure

The website content is organized into the following JSON files:

### `/src/data/personal.json`
Contains personal information, bio, contact details, and social links.

### `/src/data/navigation.json`
Contains navigation menu items, logo, and language options.

### `/src/data/projects.json`
Contains project information including titles, descriptions, technologies, and links.

### `/src/data/skills.json`
Contains skill categories and individual skills.

### `/src/data/quotes.json`
Contains inspirational quotes that rotate on the homepage.

### `/src/data/images.json`
Contains image paths and alt text for all images used on the site.

## How to Update Content

### Personal Information
Edit `/src/data/personal.json` to update:
- Name and titles
- Bio and description
- Contact information
- Social media links

### Projects
Edit `/src/data/projects.json` to:
- Add new projects
- Update project descriptions
- Change project images
- Update technology stacks
- Modify project links

### Skills
Edit `/src/data/skills.json` to:
- Add new skill categories
- Update existing skills
- Reorganize skill groupings

### Navigation
Edit `/src/data/navigation.json` to:
- Change menu items
- Update logo text
- Modify language options

### Quotes
Edit `/src/data/quotes.json` to:
- Add new quotes
- Change existing quotes
- Update authors

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── data/                   # JSON data files
│   ├── personal.json
│   ├── navigation.json
│   ├── projects.json
│   ├── skills.json
│   ├── quotes.json
│   └── images.json
├── hooks/                  # Custom React hooks
│   └── useJsonData.ts
├── lib/                    # Utility functions
├── screens/Home/           # Main page components
│   └── sections/           # Individual page sections
└── App.tsx                 # Main application component
```

## Customization

### Adding New Sections
1. Create a new JSON file in `/src/data/`
2. Add a corresponding hook in `/src/hooks/useJsonData.ts`
3. Create the section component
4. Import and use in the main Home component

### Styling
The project uses Tailwind CSS with custom color variables defined in `tailwind.css`. You can modify the color scheme by updating the CSS custom properties.

### Images
- Place images in the `/public/` directory
- Update image paths in `/src/data/images.json`
- Use relative paths starting with `/`

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update the relevant JSON files
5. Test your changes
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).