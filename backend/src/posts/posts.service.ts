import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument, PostStatus } from '../database/schemas/post.schema';
import { AiService } from '../ai/ai.service';
import { GeneratePostDto } from './dto/generate-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly aiService: AiService,
  ) {}

  async generatePost(userId: string, dto: GeneratePostDto) {
    const input = {
      topic: dto.topic,
      audience: dto.audience || 'Professionals',
      tone: dto.tone || 'Professional',
      postType: dto.postType || 'Industry Insight',
      goal: dto.goal || 'Engagement',
      length: dto.length || 'Medium',
      instructions: dto.instructions || '',
    };

    const result = await this.aiService.runFullPipeline(input);

    const post = await this.postModel.create({
      userId: new Types.ObjectId(userId),
      title: result.improved.title || dto.topic,
      topic: dto.topic,
      audience: dto.audience,
      tone: dto.tone,
      postType: dto.postType,
      goal: dto.goal,
      length: dto.length,
      instructions: dto.instructions,
      draftContent: result.draftContent,
      finalContent: result.improved.finalPost,
      hook: result.improved.hook,
      cta: result.improved.cta,
      hashtags: result.improved.hashtags,
      aiAnalysis: result.critique,
      context: result.context,
      status: PostStatus.DRAFT,
    });

    return {
      postId: post._id.toString(),
      title: post.title,
      draftContent: result.draftContent,
      context: result.context,
      critique: result.critique,
      improved: result.improved,
      status: post.status,
      isDemo: result.isDemo,
    };
  }

  async critiquePost(dto: { post: string; tone?: string; audience?: string; goal?: string }) {
    return this.aiService.critiquePost(dto.post, {
      topic: '',
      audience: dto.audience || 'Professionals',
      tone: dto.tone || 'Professional',
      postType: 'Industry Insight',
      goal: dto.goal || 'Engagement',
      length: 'Medium',
      instructions: '',
    });
  }

  async improvePost(dto: { post: string; tone?: string; audience?: string; goal?: string }) {
    const input = {
      topic: '',
      audience: dto.audience || 'Professionals',
      tone: dto.tone || 'Professional',
      postType: 'Industry Insight',
      goal: dto.goal || 'Engagement',
      length: 'Medium',
      instructions: '',
    };
    const critique = await this.aiService.critiquePost(dto.post, input);
    return this.aiService.improvePost(dto.post, critique, input);
  }

  async generateHook(post: string, instruction: string) {
    return { hook: await this.aiService.generateHook(post, instruction) };
  }

  async generateCTA(post: string, goal: string) {
    return { cta: await this.aiService.generateCTA(post, goal) };
  }

  async generateHashtags(post: string, topic: string) {
    return { hashtags: await this.aiService.generateHashtags(post, topic) };
  }

  async findAll(userId: string, status?: string) {
    const filter: any = { userId: new Types.ObjectId(userId) };
    if (status) filter.status = status;
    return this.postModel.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findOne(userId: string, postId: string) {
    const post = await this.postModel.findOne({
      _id: new Types.ObjectId(postId),
      userId: new Types.ObjectId(userId),
    }).lean();
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(userId: string, dto: CreatePostDto) {
    return this.postModel.create({
      userId: new Types.ObjectId(userId),
      ...dto,
    });
  }

  async update(userId: string, postId: string, dto: UpdatePostDto) {
    const post = await this.postModel.findOneAndUpdate(
      { _id: new Types.ObjectId(postId), userId: new Types.ObjectId(userId) },
      { $set: dto },
      { new: true },
    );
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async delete(userId: string, postId: string) {
    const result = await this.postModel.findOneAndDelete({
      _id: new Types.ObjectId(postId),
      userId: new Types.ObjectId(userId),
    });
    if (!result) throw new NotFoundException('Post not found');
    return { deleted: true };
  }

  async getDashboardStats(userId: string) {
    const uid = new Types.ObjectId(userId);
    const [total, drafts, published, thisMonth] = await Promise.all([
      this.postModel.countDocuments({ userId: uid }),
      this.postModel.countDocuments({ userId: uid, status: PostStatus.DRAFT }),
      this.postModel.countDocuments({ userId: uid, status: PostStatus.PUBLISHED }),
      this.postModel.countDocuments({
        userId: uid,
        createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
      }),
    ]);
    return { total, drafts, published, thisMonth };
  }
}

