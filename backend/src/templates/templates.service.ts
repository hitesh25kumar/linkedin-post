import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Template, TemplateDocument } from '../database/schemas/template.schema';

const DEFAULT_TEMPLATES = [
  {
    name: 'Product Management Insight',
    description: 'Share a product management observation or lesson learned',
    tone: 'Professional',
    postType: 'Product Management',
    instructions: 'Focus on a specific PM challenge or observation. Be practical.',
    isDefault: true,
  },
  {
    name: 'AI Trend',
    description: 'Comment on an AI development or trend',
    tone: 'Thought-provoking',
    postType: 'AI / Technology',
    instructions: 'Share a thoughtful perspective on AI. Avoid hype. Focus on practical implications.',
    isDefault: true,
  },
  {
    name: 'Industry Insight',
    description: 'Share an observation about your industry',
    tone: 'Professional',
    postType: 'Industry Insight',
    instructions: 'Offer a specific, non-obvious observation. Support with reasoning, not statistics.',
    isDefault: true,
  },
  {
    name: 'Career Advice',
    description: 'Share career advice or a professional lesson',
    tone: 'Conversational',
    postType: 'Career Advice',
    instructions: 'Be specific and honest. Avoid generic advice. Draw from real experience where possible.',
    isDefault: true,
  },
  {
    name: 'Educational Post',
    description: 'Teach something valuable to your audience',
    tone: 'Educational',
    postType: 'Educational',
    instructions: 'Break down a concept clearly. Use examples. Prioritize clarity over comprehensiveness.',
    isDefault: true,
  },
  {
    name: 'Personal Story',
    description: 'Share a professional story or experience',
    tone: 'Storytelling',
    postType: 'Personal Story',
    instructions: 'Be genuine. Focus on the lesson, not the drama. Keep it professional.',
    isDefault: true,
  },
  {
    name: 'How-To',
    description: 'Explain how to do something practical',
    tone: 'Educational',
    postType: 'How-To',
    instructions: 'Be specific and actionable. Number steps where helpful. End with the outcome.',
    isDefault: true,
  },
  {
    name: 'Case Study',
    description: 'Walk through a real or hypothetical case study',
    tone: 'Professional',
    postType: 'Case Study',
    instructions: 'Structure: problem → approach → result → lesson. Be specific.',
    isDefault: true,
  },
];

@Injectable()
export class TemplatesService implements OnModuleInit {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.templateModel.countDocuments({ isDefault: true });
    if (count === 0) {
      await this.templateModel.insertMany(DEFAULT_TEMPLATES);
    }
  }

  async findAll(userId: string) {
    return this.templateModel.find({
      $or: [{ isDefault: true }, { userId: new Types.ObjectId(userId) }],
    }).sort({ isDefault: -1, createdAt: -1 }).lean();
  }

  async create(userId: string, dto: Partial<Template>) {
    return this.templateModel.create({
      userId: new Types.ObjectId(userId),
      ...dto,
      isDefault: false,
    });
  }

  async update(userId: string, id: string, dto: Partial<Template>) {
    const template = await this.templateModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId), isDefault: false },
      { $set: dto },
      { new: true },
    );
    if (!template) throw new NotFoundException('Template not found or cannot be modified');
    return template;
  }

  async delete(userId: string, id: string) {
    const result = await this.templateModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
      isDefault: false,
    });
    if (!result) throw new NotFoundException('Template not found or cannot be deleted');
    return { deleted: true };
  }
}

