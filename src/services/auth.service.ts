import { Account, ID } from 'appwrite';
import { client } from '../lib/appwrite';

// Initialize Account service
export const account = new Account(client);

// Auth Service
export const authService = {
  // Create a new account
  async createAccount(email: string, password: string, name: string) {
    try {
      const response = await account.create(ID.unique(), email, password, name);
      return response;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Login with email and password
  async login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Get current logged-in user
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      await account.deleteSession('current');
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Check if user is logged in
  async isAuthenticated() {
    try {
      await account.get();
      return true;
    } catch (error) {
      return false;
    }
  },
};
