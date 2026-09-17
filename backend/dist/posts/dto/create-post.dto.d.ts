import { PostStatus } from '../../database/schemas/post.schema';
export declare class CreatePostDto {
    topic: string;
    title?: string;
    audience?: string;
    tone?: string;
    postType?: string;
    goal?: string;
    length?: string;
    instructions?: string;
    draftContent?: string;
    finalContent?: string;
    hook?: string;
    cta?: string;
    hashtags?: string[];
    status?: PostStatus;
}
