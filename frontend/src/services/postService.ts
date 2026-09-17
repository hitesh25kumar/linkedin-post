import type { Post } from '../types';
import { mockPosts } from '../data/mockData';

const STORAGE_KEY = 'linkedin_agent_posts';

export const postService = {
  getPosts: (): Post[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPosts));
      return mockPosts;
    }
    return JSON.parse(data);
  },

  getPost: (id: string): Post | undefined => {
    const posts = postService.getPosts();
    return posts.find((p) => p.id === id);
  },

  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
    const posts = postService.getPosts();
    const newPost: Post = {
      ...post,
      id: `p-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  updatePost: (id: string, updates: Partial<Post>): Post | null => {
    const posts = postService.getPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return null;
    
    posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts[index];
  },

  deletePost: (id: string): void => {
    const posts = postService.getPosts();
    const filtered = posts.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
