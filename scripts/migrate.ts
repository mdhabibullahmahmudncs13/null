/**
 * Migration Script: JSON to Appwrite
 * 
 * This script migrates your existing JSON data to Appwrite.
 * Run this once after setting up your Appwrite collections.
 * 
 * Instructions:
 * 1. Set up your Appwrite project and get credentials
 * 2. Update the .env file with your Appwrite credentials
 * 3. Create the collections in Appwrite Console (see SETUP.md)
 * 4. Run: npm run migrate (or node --loader tsx scripts/migrate.ts)
 */

import { databases, DATABASE_ID, COLLECTIONS } from '../src/lib/appwrite';
import personalData from '../src/data/personal.json';
import projectsData from '../src/data/projects.json';
import skillsData from '../src/data/skills.json';
import achievementsData from '../src/data/achievements.json';
import quotesData from '../src/data/quotes.json';
import navigationData from '../src/data/navigation.json';
import imagesData from '../src/data/images.json';

async function migrateData() {
  console.log('🚀 Starting migration to Appwrite...\n');

  try {
    // 1. Migrate Personal Info (single document)
    console.log('📝 Migrating Personal Info...');
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.PERSONAL,
      'unique()',
      personalData
    );
    console.log('✅ Personal Info migrated\n');

    // 2. Migrate Projects (multiple documents)
    console.log('📝 Migrating Projects...');
    for (const project of projectsData.projects) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        'unique()',
        {
          ...project,
          featured: project.id <= 3, // First 3 projects are featured
          order: project.id,
        }
      );
      console.log(`  ✓ Migrated: ${project.title}`);
    }
    console.log('✅ All projects migrated\n');

    // 3. Migrate Skills (single document)
    console.log('📝 Migrating Skills...');
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.SKILLS,
      'unique()',
      skillsData
    );
    console.log('✅ Skills migrated\n');

    // 4. Migrate Achievements (single document)
    console.log('📝 Migrating Achievements...');
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.ACHIEVEMENTS,
      'unique()',
      achievementsData
    );
    console.log('✅ Achievements migrated\n');

    // 5. Migrate Quotes (multiple documents)
    console.log('📝 Migrating Quotes...');
    quotesData.quotes.forEach(async (quote, index) => {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.QUOTES,
        'unique()',
        {
          ...quote,
          order: index,
        }
      );
      console.log(`  ✓ Migrated quote by: ${quote.author}`);
    });
    console.log('✅ All quotes migrated\n');

    // 6. Migrate Navigation (single document)
    console.log('📝 Migrating Navigation...');
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.NAVIGATION,
      'unique()',
      navigationData
    );
    console.log('✅ Navigation migrated\n');

    // 7. Migrate Images (single document)
    console.log('📝 Migrating Images...');
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.IMAGES,
      'unique()',
      imagesData
    );
    console.log('✅ Images migrated\n');

    console.log('🎉 Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your components to use Appwrite hooks');
    console.log('2. Upload images to Appwrite Storage');
    console.log('3. Test the application');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();
