import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import {
  IAiProvider,
  ResearchContext,
  PostDraft,
  CritiqueResult,
  ImprovedPost,
  GeneratePostInput,
} from './ai.provider';
import { buildResearchPrompt } from '../prompts/research.prompt';
import { buildWriterPrompt } from '../prompts/writer.prompt';
import { buildCriticPrompt } from '../prompts/critic.prompt';
import { buildEditorPrompt } from '../prompts/editor.prompt';
import { buildHookPrompt } from '../prompts/hook.prompt';
import { buildCtaPrompt } from '../prompts/cta.prompt';
import { buildHashtagsPrompt } from '../prompts/hashtags.prompt';

@Injectable()
export class GeminiProvider implements IAiProvider {
  private model: GenerativeModel;

  constructor(private configService: ConfigService) {
    const apiKey = configService.get<string>('GEMINI_API_KEY') as string;
    const modelName = configService.get<string>(
      'GEMINI_MODEL',
      'gemini-2.5-flash',
    ) as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  isDemo(): boolean {
    return false;
  }

  private async callGemini(prompt: string, maxRetries = 3): Promise<string> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.model.generateContent(prompt);
        const response = result.response;
        return response.text();
      } catch (error: any) {
        console.error(`Gemini API Error (attempt ${attempt}/${maxRetries}):`, error?.message || error);
        const isTemporary = error?.status === 503 || error?.status === 429 || error?.message?.includes('503') || error?.message?.includes('429');
        if (isTemporary && attempt < maxRetries) {
          const delay = attempt * 1500;
          console.log(`Waiting ${delay}ms before retrying Gemini request...`);
          await new Promise((res) => setTimeout(res, delay));
          continue;
        }
        if (error?.status === 429) {
          throw new Error('AI rate limit reached. Please wait a moment and try again.');
        }
        if (error?.status === 401 || error?.status === 403) {
          throw new Error('Invalid Gemini API key. Please check your configuration.');
        }
        throw new Error(`AI generation failed: ${error?.message || 'Please check network and Gemini API key'}`);
      }
    }
    throw new Error('AI generation failed after multiple retries.');
  }

  private parseJson<T>(raw: string, fallback: T): T {
    // Strip markdown code fences if present
    let cleaned = raw.trim();
    cleaned = cleaned
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      return fallback;
    }
  }

  async researchTopic(input: GeneratePostInput): Promise<ResearchContext> {
    const prompt = buildResearchPrompt(input);
    const raw = await this.callGemini(prompt);
    return this.parseJson<ResearchContext>(raw, {
      keyPoints: [],
      angles: [],
      importantConsiderations: [],
      potentialClaims: [],
      factualRisk: [],
    });
  }

  async generatePost(
    input: GeneratePostInput,
    context: ResearchContext,
  ): Promise<PostDraft> {
    const prompt = buildWriterPrompt(input, context);
    const raw = await this.callGemini(prompt);
    return this.parseJson<PostDraft>(raw, { title: input.topic, content: raw });
  }

  async critiquePost(
    post: string,
    input: GeneratePostInput,
  ): Promise<CritiqueResult> {
    const prompt = buildCriticPrompt(post, input);
    const raw = await this.callGemini(prompt);
    return this.parseJson<CritiqueResult>(raw, {
      overallScore: 7,
      hookScore: 7,
      clarityScore: 7,
      valueScore: 7,
      authenticityScore: 7,
      engagementScore: 7,
      strengths: ['Clear message'],
      weaknesses: ['Could be more specific'],
      suggestions: ['Add a concrete example'],
      factualWarnings: [],
    });
  }

  async improvePost(
    post: string,
    critique: CritiqueResult,
    input: GeneratePostInput,
  ): Promise<ImprovedPost> {
    const prompt = buildEditorPrompt(post, critique, input);
    const raw = await this.callGemini(prompt);
    return this.parseJson<ImprovedPost>(raw, {
      title: input.topic,
      hook: post.split('\n')[0] || '',
      finalPost: post,
      hashtags: [],
      cta: '',
      warnings: [],
    });
  }

  async generateHook(post: string, instruction: string): Promise<string> {
    const prompt = buildHookPrompt(post, instruction);
    const raw = await this.callGemini(prompt);
    return raw.trim();
  }

  async generateCTA(post: string, goal: string): Promise<string> {
    const prompt = buildCtaPrompt(post, goal);
    const raw = await this.callGemini(prompt);
    return raw.trim();
  }

  async generateHashtags(post: string, topic: string): Promise<string[]> {
    const prompt = buildHashtagsPrompt(post, topic);
    const raw = await this.callGemini(prompt);
    const parsed = this.parseJson<string[]>(raw, []);
    if (Array.isArray(parsed)) return parsed;
    return raw.match(/#[\w]+/g) || [];
  }
}
