import { Document, Types } from 'mongoose';
export type PostDocument = Post & Document;
export declare enum PostStatus {
    DRAFT = "draft",
    REVIEW = "review",
    APPROVED = "approved",
    PUBLISHED = "published"
}
export declare class Post {
    userId: Types.ObjectId;
    title: string;
    topic?: string;
    audience: string;
    tone: string;
    postType: string;
    goal: string;
    length: string;
    instructions: string;
    draftContent: string;
    finalContent: string;
    hook: string;
    cta: string;
    hashtags: string[];
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
    context: {
        keyPoints: string[];
        angles: string[];
        importantConsiderations: string[];
        potentialClaims: string[];
        factualRisk: string[];
    };
    status: PostStatus;
    publishedAt: Date | null;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, Document<unknown, any, Post, any, {}> & Post & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, Document<unknown, {}, import("mongoose").FlatRecord<Post>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Post> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
