import { PostsService } from './posts.service';
import { GeneratePostDto } from './dto/generate-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RegenerateSectionDto } from './dto/regenerate-section.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    generate(user: {
        sub: string;
    }, dto: GeneratePostDto): Promise<{
        postId: string;
        title: string;
        draftContent: string;
        context: import("../ai/providers/ai.provider").ResearchContext;
        critique: import("../ai/providers/ai.provider").CritiqueResult;
        improved: import("../ai/providers/ai.provider").ImprovedPost;
        status: import("../database/schemas/post.schema").PostStatus;
        isDemo: boolean;
    }>;
    critique(body: {
        post: string;
        tone?: string;
        audience?: string;
        goal?: string;
    }): Promise<import("../ai/providers/ai.provider").CritiqueResult>;
    improve(body: {
        post: string;
        tone?: string;
        audience?: string;
        goal?: string;
    }): Promise<import("../ai/providers/ai.provider").ImprovedPost>;
    generateHook(dto: RegenerateSectionDto): Promise<{
        hook: string;
    }>;
    generateCTA(dto: RegenerateSectionDto): Promise<{
        cta: string;
    }>;
    generateHashtags(dto: RegenerateSectionDto): Promise<{
        hashtags: string[];
    }>;
    stats(user: {
        sub: string;
    }): Promise<{
        total: number;
        drafts: number;
        published: number;
        thisMonth: number;
    }>;
    findAll(user: {
        sub: string;
    }, status?: string): Promise<(import("mongoose").FlattenMaps<import("../database/schemas/post.schema").PostDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(user: {
        sub: string;
    }, id: string): Promise<import("mongoose").FlattenMaps<import("../database/schemas/post.schema").PostDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(user: {
        sub: string;
    }, dto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, import("../database/schemas/post.schema").PostDocument, {}, {}> & import("../database/schemas/post.schema").Post & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(user: {
        sub: string;
    }, id: string, dto: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, import("../database/schemas/post.schema").PostDocument, {}, {}> & import("../database/schemas/post.schema").Post & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(user: {
        sub: string;
    }, id: string): Promise<{
        deleted: boolean;
    }>;
}
