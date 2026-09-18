import { Injectable, Inject, ServiceUnavailableException } from '@nestjs/common';
import {
  AI_PROVIDER,
  IAiProvider,
  GeneratePostInput,
  ResearchContext,
  CritiqueResult,
  ImprovedPost,
} from './providers/ai.provider';

export interface GeneratePipelineResult {
  context: ResearchContext;
  draftContent: string;
  draftTitle: string;
  critique: CritiqueResult;
  improved: ImprovedPost;
  isDemo: boolean;
}

@Injectable()
export class AiService {
  constructor(
    @Inject(AI_PROVIDER) private readonly provider: IAiProvider,
  ) {}

  isDemo(): boolean {
    return this.provider.isDemo();
  }

  async runFullPipeline(
    input: GeneratePostInput,
  ): Promise<GeneratePipelineResult> {
    try {
      const context = await this.provider.researchTopic(input);
      const draft = await this.provider.generatePost(input, context);
      const critique = await this.provider.critiquePost(draft.content, input);
      const improved = await this.provider.improvePost(draft.content, critique, input);

      return {
        context,
        draftContent: draft.content,
        draftTitle: draft.title,
        critique,
        improved,
        isDemo: this.provider.isDemo(),
      };
    } catch (error) {
      console.error('AI provider failed:', error);
      throw new ServiceUnavailableException(
        error instanceof Error ? error.message : 'AI provider is unavailable',
      );
    }
  }

  async critiquePost(
    post: string,
    input: GeneratePostInput,
  ): Promise<CritiqueResult> {
    return this.provider.critiquePost(post, input);
  }

  async improvePost(
    post: string,
    critique: CritiqueResult,
    input: GeneratePostInput,
  ): Promise<ImprovedPost> {
    return this.provider.improvePost(post, critique, input);
  }

  async generateHook(post: string, instruction: string): Promise<string> {
    return this.provider.generateHook(post, instruction);
  }

  async generateCTA(post: string, goal: string): Promise<string> {
    return this.provider.generateCTA(post, goal);
  }

  async generateHashtags(post: string, topic: string): Promise<string[]> {
    return this.provider.generateHashtags(post, topic);
  }
}
