import { create } from 'zustand';
import type { Post, Template, User } from '../types';
import { postService } from '../services/postService';
import { templateService } from '../services/templateService';
import { authService } from '../services/authService';

interface AppState {
  user: User | null;
  posts: Post[];
  templates: Template[];
  isAuthenticated: boolean;
  loadInitialData: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  setUser: (user: User | null) => void;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  createTemplate: (template: Omit<Template, 'id'>) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  posts: [],
  templates: [],
  isAuthenticated: false,
  
  loadInitialData: async () => {
    const user = await authService.getUser();
    if (!user) {
      set({ user: null, posts: [], templates: [], isAuthenticated: false });
      return;
    }
    const [posts, templates] = await Promise.all([
      postService.getPosts(),
      templateService.getTemplates(),
    ]);
    set({ user, posts, templates, isAuthenticated: !!user });
  },
  refreshPosts: async () => set({ posts: await postService.getPosts() }),
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  createPost: async (postData) => {
    await postService.createPost(postData);
    set({ posts: await postService.getPosts() });
  },
  
  updatePost: async (id, updatedPost) => {
    await postService.updatePost(id, updatedPost);
    set({ posts: await postService.getPosts() });
  },
  
  deletePost: async (id) => {
    await postService.deletePost(id);
    set({ posts: await postService.getPosts() });
  },

  createTemplate: async (templateData) => {
    await templateService.createTemplate(templateData);
    set({ templates: await templateService.getTemplates() });
  }
}));
