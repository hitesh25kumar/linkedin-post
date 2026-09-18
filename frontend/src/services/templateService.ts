import type { Template } from '../types';
import { api } from './api';

interface ApiTemplate extends Template { _id?: string; }

const toTemplate = (template: ApiTemplate): Template => ({
  ...template,
  id: template.id || template._id || '',
});

export const templateService = {
  getTemplates: async (): Promise<Template[]> => {
    const { data } = await api.get<ApiTemplate[]>('/templates');
    return data.map(toTemplate);
  },

  createTemplate: async (template: Omit<Template, 'id'>): Promise<Template> => {
    const { data } = await api.post<ApiTemplate>('/templates', template);
    return toTemplate(data);
  },

  updateTemplate: async (id: string, updates: Partial<Template>): Promise<Template> => {
    const { data } = await api.patch<ApiTemplate>(`/templates/${id}`, updates);
    return toTemplate(data);
  },

  deleteTemplate: async (id: string): Promise<void> => {
    await api.delete(`/templates/${id}`);
  },
};
