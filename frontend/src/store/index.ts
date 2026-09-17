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
  loadInitialData: () => void;
  setUser: (user: User | null) => void;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  createTemplate: (template: Omit<Template, 'id'>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  posts: [],
  templates: [],
  isAuthenticated: false,
  
  loadInitialData: () => {
    const user = authService.getUser();
    const posts = postService.getPosts();
    const templates = templateService.getTemplates();
    set({ user, posts, templates, isAuthenticated: !!user });
  },
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  createPost: (postData) => {
    postService.createPost(postData);
    set({ posts: postService.getPosts() });
  },
  
  updatePost: (id, updatedPost) => {
    postService.updatePost(id, updatedPost);
    set({ posts: postService.getPosts() });
  },
  
  deletePost: (id) => {
    postService.deletePost(id);
    set({ posts: postService.getPosts() });
  },

  createTemplate: (templateData) => {
    templateService.createTemplate(templateData);
    set({ templates: templateService.getTemplates() });
  }
}));
