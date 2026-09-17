import type { Template } from '../types';
import { mockTemplates } from '../data/mockData';

const STORAGE_KEY = 'linkedin_agent_templates';

export const templateService = {
  getTemplates: (): Template[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTemplates));
      return mockTemplates;
    }
    return JSON.parse(data);
  },

  createTemplate: (template: Omit<Template, 'id'>): Template => {
    const templates = templateService.getTemplates();
    const newTemplate: Template = {
      ...template,
      id: `t-${Date.now()}`,
    };
    templates.push(newTemplate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    return newTemplate;
  }
};
