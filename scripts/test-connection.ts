/**
 * Appwrite Setup Helper
 * 
 * This script helps verify your Appwrite configuration
 */

import { client, databases, DATABASE_ID, COLLECTIONS } from '../src/lib/appwrite';

async function testConnection() {
  console.log('🔍 Testing Appwrite Connection...\n');

  try {
    // Test 1: Check if client is configured
    console.log('✅ Appwrite client initialized');
    console.log(`   Endpoint: ${import.meta.env.VITE_APPWRITE_ENDPOINT}`);
    console.log(`   Project: ${import.meta.env.VITE_APPWRITE_PROJECT_ID}\n`);

    // Test 2: Check database connection
    console.log('🔍 Testing database connection...');
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PERSONAL);
    console.log(`✅ Database connected! Found ${response.total} document(s) in personal_info\n`);

    // Test 3: List all collections
    console.log('📋 Collection Status:');
    
    const collections = [
      { name: 'Personal Info', id: COLLECTIONS.PERSONAL },
      { name: 'Projects', id: COLLECTIONS.PROJECTS },
      { name: 'Skills', id: COLLECTIONS.SKILLS },
      { name: 'Achievements', id: COLLECTIONS.ACHIEVEMENTS },
      { name: 'Quotes', id: COLLECTIONS.QUOTES },
      { name: 'Navigation', id: COLLECTIONS.NAVIGATION },
      { name: 'Images', id: COLLECTIONS.IMAGES },
    ];

    for (const collection of collections) {
      try {
        const docs = await databases.listDocuments(DATABASE_ID, collection.id);
        console.log(`   ✅ ${collection.name}: ${docs.total} document(s)`);
      } catch (error) {
        console.log(`   ❌ ${collection.name}: Not accessible`);
      }
    }

    console.log('\n🎉 Appwrite setup is working correctly!');
    console.log('\nNext steps:');
    console.log('1. If you see 0 documents, run: npx tsx scripts/migrate.ts');
    console.log('2. Start your app: npm run dev');
    console.log('3. Visit http://localhost:5173/admin to manage content');

  } catch (error: any) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.log('\n📝 Troubleshooting:');
    console.log('1. Check your .env file has correct values');
    console.log('2. Verify your Appwrite project is accessible');
    console.log('3. Ensure collections are created (see SETUP.md)');
    console.log('4. Check if your domain is added to Web Platforms in Appwrite');
    process.exit(1);
  }
}

testConnection();
