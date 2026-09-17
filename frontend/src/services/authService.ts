import type { User } from '../types';
import { mockUser } from '../data/mockData';

const USER_STORAGE_KEY = 'linkedin_agent_user';
const AUTH_STORAGE_KEY = 'linkedin_agent_auth';

export const authService = {
  getUser: (): User | null => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!isAuthenticated) return null;

    const data = localStorage.getItem(USER_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      return mockUser;
    }
    return JSON.parse(data);
  },

  login: async (email: string, password: string): Promise<User> => {
    // Mock login delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Logging in ${email} with password length ${password.length}`);
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
        resolve(mockUser);
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};
