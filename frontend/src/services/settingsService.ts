import type { User } from '../types';
import { api } from './api';

export interface UserSettings extends User {
  preferences?: {
    defaultTone?: string;
    defaultAudience?: string;
    defaultLength?: string;
  };
}

export const settingsService = {
  get: async (): Promise<UserSettings> => (await api.get<UserSettings>('/settings')).data,
  update: async (settings: Partial<UserSettings>): Promise<UserSettings> =>
    (await api.patch<UserSettings>('/settings', settings)).data,
};