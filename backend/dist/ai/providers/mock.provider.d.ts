import { IAiProvider, ResearchContext, PostDraft, CritiqueResult, ImprovedPost, GeneratePostInput } from './ai.provider';
export declare class MockProvider implements IAiProvider {
    isDemo(): boolean;
    researchTopic(_input: GeneratePostInput): Promise<ResearchContext>;
    generatePost(input: GeneratePostInput, _context: ResearchContext): Promise<PostDraft>;
    critiquePost(_post: string, _input: GeneratePostInput): Promise<CritiqueResult>;
    improvePost(_post: string, _critique: CritiqueResult, input: GeneratePostInput): Promise<ImprovedPost>;
    generateHook(_post: string, _instruction: string): Promise<string>;
    generateCTA(_post: string, _goal: string): Promise<string>;
    generateHashtags(_post: string, _topic: string): Promise<string[]>;
    private delay;
}
