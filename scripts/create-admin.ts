/**
 * Create Admin User Script
 * 
 * This script helps you create your first admin user.
 * Run once to set up authentication.
 * 
 * Usage: npx tsx scripts/create-admin.ts
 */

import { Account, ID } from 'appwrite';
import { client } from '../src/lib/appwrite';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  console.log('🔐 Admin User Creation\n');

  try {
    const account = new Account(client);

    console.log('Please enter admin details:\n');

    const name = await question('Full Name: ');
    const email = await question('Email: ');
    const password = await question('Password (min 8 characters): ');

    if (password.length < 8) {
      console.error('\n❌ Password must be at least 8 characters long');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creating admin user...');

    const user = await account.create(ID.unique(), email, password, name);

    console.log('\n✅ Admin user created successfully!');
    console.log(`\nUser Details:`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  ID: ${user.$id}`);
    
    console.log('\n🎉 Setup complete!');
    console.log('\nYou can now:');
    console.log('1. Start your app: npm run dev');
    console.log('2. Go to: http://localhost:5173/login');
    console.log('3. Login with your credentials');
    console.log('4. Access admin panel at: http://localhost:5173/admin');

  } catch (error: any) {
    console.error('\n❌ Error creating admin user:', error.message);
    
    if (error.message?.includes('user already exists')) {
      console.log('\n💡 Tip: This email is already registered.');
      console.log('   You can login with existing credentials or use a different email.');
    }
    
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
createAdmin();
