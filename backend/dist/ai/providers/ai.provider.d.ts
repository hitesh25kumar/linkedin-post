export declare const AI_PROVIDER = "AI_PROVIDER";
export interface ResearchContext {
    keyPoints: string[];
    angles: string[];
    importantConsiderations: string[];
    potentialClaims: string[];
    factualRisk: string[];
}
export interface PostDraft {
    title: string;
    content: string;
}
export interface CritiqueResult {
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
}
export interface ImprovedPost {
    title: string;
    hook: string;
    finalPost: string;
    hashtags: string[];
    cta: string;
    warnings: string[];
}
export interface GeneratePostInput {
    topic: string;
    audience: string;
    tone: string;
    postType: string;
    goal: string;
    length: string;
    instructions: string;
    userProfile?: {
        name?: string;
        headline?: string;
        bio?: string;
        industry?: string;
        expertise?: string[];
    };
}
export interface IAiProvider {
    researchTopic(input: GeneratePostInput): Promise<ResearchContext>;
    generatePost(input: GeneratePostInput, context: ResearchContext): Promise<PostDraft>;
    critiquePost(post: string, input: GeneratePostInput): Promise<CritiqueResult>;
    improvePost(post: string, critique: CritiqueResult, input: GeneratePostInput): Promise<ImprovedPost>;
    generateHook(post: string, instruction: string): Promise<string>;
    generateCTA(post: string, goal: string): Promise<string>;
    generateHashtags(post: string, topic: string): Promise<string[]>;
    isDemo(): boolean;
}
