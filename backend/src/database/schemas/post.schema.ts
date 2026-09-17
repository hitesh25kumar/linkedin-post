import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

export enum PostStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: '' })
  title: string;

  @Prop({ required: false })
  topic?: string;

  @Prop({ default: '' })
  audience: string;

  @Prop({ default: 'Professional' })
  tone: string;

  @Prop({ default: 'Industry Insight' })
  postType: string;

  @Prop({ default: 'Engagement' })
  goal: string;

  @Prop({ default: 'Medium' })
  length: string;

  @Prop({ default: '' })
  instructions: string;

  @Prop({ default: '' })
  draftContent: string;

  @Prop({ default: '' })
  finalContent: string;

  @Prop({ default: '' })
  hook: string;

  @Prop({ default: '' })
  cta: string;

  @Prop({ type: [String], default: [] })
  hashtags: string[];

  @Prop({ type: Object, default: {} })
  aiAnalysis: {
    overallScore: number;
    hookScore: number;
    clarityScore: number;
    valueScore: number;
    authenticityScore: number;
    engagementScore: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    factualWarnings: string[];
  };

  @Prop({ type: Object, default: {} })
  context: {
    keyPoints: string[];
    angles: string[];
    importantConsiderations: string[];
    potentialClaims: string[];
    factualRisk: string[];
  };

  @Prop({ enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Prop({ type: Date, default: null })
  publishedAt: Date | null;
}

export const PostSchema = SchemaFactory.createForClass(Post);
