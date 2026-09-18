import type { Post } from '../types';
import { api } from './api';

export interface GeneratePostInput {
  topic: string;
  audience?: string;
  tone?: string;
  postType?: string;
  goal?: string;
  length?: string;
  instructions?: string;
}

interface GeneratePostResponse {
  postId: string;
  title: string;
  improved: {
    finalPost: string;
    hashtags: string[];
  };
  critique: {
    hookScore: number;
    clarityScore: number;
    valueScore: number;
    authenticityScore: number;
    engagementScore: number;
    strengths: string[];
    weaknesses: string[];
  };
  status: string;
}

interface ApiPost {
  _id: string;
  topic: string;
  audience?: string;
  tone?: string;
  postType?: string;
  goal?: string;
  length?: string;
  instructions?: string;
  finalContent?: string;
  draftContent?: string;
  hashtags?: string[];
  status: 'Draft' | 'Published' | 'Approved' | string;
  createdAt: string;
  updatedAt: string;
  aiAnalysis?: GeneratePostResponse['critique'];
}

const toUiStatus = (status: string): Post['status'] => {
  if (status === 'published') return 'Published';
  if (status === 'approved') return 'Approved';
  return 'Draft';
};

const toPost = (post: ApiPost): Post => ({
  id: post._id,
  topic: post.topic,
  audience: post.audience || '',
  tone: post.tone || 'Professional',
  type: post.postType || 'Industry Insight',
  goal: post.goal || 'Engagement',
  length: post.length || 'Medium',
  instructions: post.instructions || '',
  content: post.finalContent || post.draftContent || '',
  hashtags: post.hashtags || [],
  status: toUiStatus(post.status.toLowerCase()),
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  metrics: post.aiAnalysis ? {
    hook: post.aiAnalysis.hookScore,
    clarity: post.aiAnalysis.clarityScore,
    value: post.aiAnalysis.valueScore,
    authenticity: post.aiAnalysis.authenticityScore,
    engagement: post.aiAnalysis.engagementScore,
  } : undefined,
  analysis: post.aiAnalysis ? {
    works: post.aiAnalysis.strengths || [],
    improve: post.aiAnalysis.weaknesses || [],
  } : undefined,
});

const toApiStatus = (status?: Post['status']): string | undefined =>
  status ? status.toLowerCase() : undefined;

export const postService = {
  generatePost: async (input: GeneratePostInput): Promise<Post> => {
    const { data } = await api.post<GeneratePostResponse>('/posts/generate', input);
    const now = new Date().toISOString();
    const post: Post = {
      id: data.postId,
      topic: input.topic,
      audience: input.audience || '',
      tone: input.tone || 'Professional',
      type: input.postType || 'Industry Insight',
      goal: input.goal || 'Engagement',
      length: input.length || 'Medium',
      instructions: input.instructions || '',
      content: data.improved.finalPost,
      hashtags: data.improved.hashtags || [],
      status: 'Draft',
      createdAt: now,
      updatedAt: now,
      metrics: {
        hook: data.critique.hookScore,
        clarity: data.critique.clarityScore,
        value: data.critique.valueScore,
        authenticity: data.critique.authenticityScore,
        engagement: data.critique.engagementScore,
      },
      analysis: {
        works: data.critique.strengths || [],
        improve: data.critique.weaknesses || [],
      },
    };

    return post;
  },

  getPosts: async (status?: string): Promise<Post[]> => {
    const { data } = await api.get<ApiPost[]>('/posts', { params: status ? { status } : undefined });
    return data.map(toPost);
  },

  getPost: async (id: string): Promise<Post> => {
    const { data } = await api.get<ApiPost>(`/posts/${id}`);
    return toPost(data);
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
    const { data } = await api.post<ApiPost>('/posts', {
      topic: post.topic,
      audience: post.audience,
      tone: post.tone,
      postType: post.type,
      goal: post.goal,
      length: post.length,
      instructions: post.instructions,
      finalContent: post.content,
      hashtags: post.hashtags,
      status: toApiStatus(post.status),
    });
    return toPost(data);
  },

  updatePost: async (id: string, updates: Partial<Post>): Promise<Post> => {
    const { data } = await api.patch<ApiPost>(`/posts/${id}`, {
      topic: updates.topic,
      audience: updates.audience,
      tone: updates.tone,
      goal: updates.goal,
      length: updates.length,
      instructions: updates.instructions,
      hashtags: updates.hashtags,
      status: toApiStatus(updates.status),
      postType: updates.type,
      finalContent: updates.content,
    });
    return toPost(data);
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  getStats: async () => (await api.get('/posts/stats')).data,
  critique: async (post: string, input: { tone?: string; audience?: string; goal?: string }) =>
    (await api.post('/posts/critique', { post, ...input })).data,
  improve: async (post: string, input: { tone?: string; audience?: string; goal?: string }) =>
    (await api.post('/posts/improve', { post, ...input })).data,
  generateHook: async (post: string, instruction: string) =>
    (await api.post('/posts/generate-hook', { post, instruction })).data,
  generateCTA: async (post: string, goal: string) =>
    (await api.post('/posts/generate-cta', { post, goal })).data,
  generateHashtags: async (post: string, topic: string) =>
    (await api.post('/posts/generate-hashtags', { post, topic })).data,
};
