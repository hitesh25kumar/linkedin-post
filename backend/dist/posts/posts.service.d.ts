import { Model, Types } from 'mongoose';
import { Post, PostDocument, PostStatus } from '../database/schemas/post.schema';
import { AiService } from '../ai/ai.service';
import { GeneratePostDto } from './dto/generate-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private postModel;
    private readonly aiService;
    constructor(postModel: Model<PostDocument>, aiService: AiService);
    generatePost(userId: string, dto: GeneratePostDto): Promise<{
        postId: string;
        title: string;
        draftContent: string;
        context: import("../ai/providers/ai.provider").ResearchContext;
        critique: import("../ai/providers/ai.provider").CritiqueResult;
        improved: import("../ai/providers/ai.provider").ImprovedPost;
        status: PostStatus;
        isDemo: boolean;
    }>;
    critiquePost(dto: {
        post: string;
        tone?: string;
        audience?: string;
        goal?: string;
    }): Promise<import("../ai/providers/ai.provider").CritiqueResult>;
    improvePost(dto: {
        post: string;
        tone?: string;
        audience?: string;
        goal?: string;
    }): Promise<import("../ai/providers/ai.provider").ImprovedPost>;
    generateHook(post: string, instruction: string): Promise<{
        hook: string;
    }>;
    generateCTA(post: string, goal: string): Promise<{
        cta: string;
    }>;
    generateHashtags(post: string, topic: string): Promise<{
        hashtags: string[];
    }>;
    findAll(userId: string, status?: string): Promise<(import("mongoose").FlattenMaps<PostDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(userId: string, postId: string): Promise<import("mongoose").FlattenMaps<PostDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(userId: string, dto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, PostDocument, {}, {}> & Post & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(userId: string, postId: string, dto: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, PostDocument, {}, {}> & Post & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(userId: string, postId: string): Promise<{
        deleted: boolean;
    }>;
    getDashboardStats(userId: string): Promise<{
        total: number;
        drafts: number;
        published: number;
        thisMonth: number;
    }>;
}
