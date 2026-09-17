import type { Post, Template, User } from '../types';

export const mockUser: User = {
  id: 'u-1',
  name: 'Hanisha Sachdeva',
  email: 'hanisha@example.com',
  headline: 'Product Manager | AI',
  bio: 'Passionate about building AI-driven products that solve real problems.',
  industry: 'Technology',
  expertise: ['Product Management', 'AI', 'AI Agents', 'Technology', 'FinTech']
};

export const mockPosts: Post[] = [
  {
    id: 'p-1',
    topic: 'AI Agents in Product Management',
    audience: 'Product Managers',
    tone: 'Professional',
    type: 'Industry Insight',
    goal: 'Thought Leadership',
    length: 'Medium (100 - 300 words)',
    instructions: '',
    content: "AI agents won't replace Product Managers.\n\nBut Product Managers who know how to work with AI agents may move much faster.\n\nThink about what a PM spends time doing every week:\n\n→ Reading customer feedback\n→ Analyzing product data\n→ Writing PRDs\n→ Creating user stories\n→ Preparing meeting notes\n\nA lot of this work isn't necessarily product strategy.\n\nIt's information processing.\n\nThat's where AI agents become interesting.\n\nInstead of simply asking AI to summarize 50 customer complaints, an agent can help categorize them, identify patterns and surface areas that deserve deeper investigation.\n\nThe PM can then spend more time asking:\n\n\"What should we actually build?\"\n\nThat's the shift I find most interesting.\n\nAI isn't just making individual tasks faster.\n\nIt's changing where product managers can spend their time creating value.",
    hashtags: ['#ProductManagement', '#AI', '#AIAgents', '#ProductManager'],
    status: 'Draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: { hook: 8.5, clarity: 9, value: 8.5, authenticity: 9, engagement: 8 },
    analysis: {
      works: ['Strong opening', 'Clear explanation', 'Practical example', 'Easy to scan'],
      improve: ['Make the opening more specific', 'Add a stronger closing question']
    }
  },
  {
    id: 'p-2',
    topic: 'Why Technical Skills Matter for PMs',
    audience: 'Aspiring PMs',
    tone: 'Educational',
    type: 'Career Advice',
    goal: 'Education',
    length: 'Medium (100 - 300 words)',
    instructions: '',
    content: 'Technical skills are a superpower for Product Managers...',
    hashtags: ['#ProductManagement', '#TechSkills', '#CareerAdvice'],
    status: 'Published',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'p-3',
    topic: 'The Future of AI Agents',
    audience: 'Tech Enthusiasts',
    tone: 'Thought-provoking',
    type: 'AI / Technology',
    goal: 'Thought Leadership',
    length: 'Long (> 300 words)',
    instructions: '',
    content: 'The era of passive tools is ending. The era of active agents is beginning...',
    hashtags: ['#AI', '#FutureOfTech', '#AIAgents'],
    status: 'Draft',
    createdAt: new Date('2023-09-15T12:00:00Z').toISOString(),
    updatedAt: new Date('2023-09-15T12:00:00Z').toISOString(),
  }
];

export const mockTemplates: Template[] = [
  {
    id: 't-1',
    name: 'Product Management Insight',
    description: 'For sharing product observations.',
    tone: 'Professional',
    instructions: 'Focus on a single core observation. Provide context, explain the implication, and end with an actionable takeaway for PMs.'
  },
  {
    id: 't-2',
    name: 'AI Trend',
    description: 'For explaining AI developments.',
    tone: 'Educational',
    instructions: 'Break down a complex AI concept into simple terms. Explain why it matters for businesses.'
  },
  {
    id: 't-3',
    name: 'Career Advice',
    description: 'For professional advice.',
    tone: 'Conversational',
    instructions: 'Share a personal career lesson. Be authentic and encouraging.'
  }
];
