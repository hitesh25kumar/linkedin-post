export interface User {
  id: string;
  name: string;
  email: string;
  headline: string;
  bio: string;
  industry: string;
  expertise: string[];
}

export interface Post {
  id: string;
  topic: string;
  audience: string;
  tone: string;
  type: string;
  goal: string;
  length: string;
  instructions: string;
  content: string;
  hashtags: string[];
  status: 'Draft' | 'Published' | 'Approved';
  createdAt: string;
  updatedAt: string;
  metrics?: {
    hook: number;
    clarity: number;
    value: number;
    authenticity: number;
    engagement: number;
  };
  analysis?: {
    works: string[];
    improve: string[];
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  instructions: string;
  tone: string;
}
