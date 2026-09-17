import { IAiProvider, GeneratePostInput, ResearchContext, CritiqueResult, ImprovedPost } from './providers/ai.provider';
export interface GeneratePipelineResult {
    context: ResearchContext;
    draftContent: string;
    draftTitle: string;
    critique: CritiqueResult;
    improved: ImprovedPost;
    isDemo: boolean;
}
export declare class AiService {
    private readonly provider;
    constructor(provider: IAiProvider);
    isDemo(): boolean;
    runFullPipeline(input: GeneratePostInput): Promise<GeneratePipelineResult>;
    critiquePost(post: string, input: GeneratePostInput): Promise<CritiqueResult>;
    improvePost(post: string, critique: CritiqueResult, input: GeneratePostInput): Promise<ImprovedPost>;
    generateHook(post: string, instruction: string): Promise<string>;
    generateCTA(post: string, goal: string): Promise<string>;
    generateHashtags(post: string, topic: string): Promise<string[]>;
}
