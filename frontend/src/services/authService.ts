import type { User } from '../types';
import { api } from './api';

const USER_STORAGE_KEY = 'linkedin_agent_user';
const TOKEN_STORAGE_KEY = 'linkedin_agent_token';

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  getUser: async (): Promise<User | null> => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) return null;
    try {
      const { data } = await api.get<User>('/auth/me');
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch {
      authService.logout();
      return null;
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    return data.user;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    return data.user;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};
