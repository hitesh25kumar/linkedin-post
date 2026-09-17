import { ConfigService } from '@nestjs/config';
import { IAiProvider, ResearchContext, PostDraft, CritiqueResult, ImprovedPost, GeneratePostInput } from './ai.provider';
export declare class GeminiProvider implements IAiProvider {
    private configService;
    private model;
    constructor(configService: ConfigService);
    isDemo(): boolean;
    private callGemini;
    private parseJson;
    researchTopic(input: GeneratePostInput): Promise<ResearchContext>;
    generatePost(input: GeneratePostInput, context: ResearchContext): Promise<PostDraft>;
    critiquePost(post: string, input: GeneratePostInput): Promise<CritiqueResult>;
    improvePost(post: string, critique: CritiqueResult, input: GeneratePostInput): Promise<ImprovedPost>;
    generateHook(post: string, instruction: string): Promise<string>;
    generateCTA(post: string, goal: string): Promise<string>;
    generateHashtags(post: string, topic: string): Promise<string[]>;
}
