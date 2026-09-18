"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
const research_prompt_1 = require("../prompts/research.prompt");
const writer_prompt_1 = require("../prompts/writer.prompt");
const critic_prompt_1 = require("../prompts/critic.prompt");
const editor_prompt_1 = require("../prompts/editor.prompt");
const hook_prompt_1 = require("../prompts/hook.prompt");
const cta_prompt_1 = require("../prompts/cta.prompt");
const hashtags_prompt_1 = require("../prompts/hashtags.prompt");
let GeminiProvider = class GeminiProvider {
    constructor(configService) {
        this.configService = configService;
        const apiKey = configService.get('GEMINI_API_KEY');
        const modelName = configService.get('GEMINI_MODEL', 'gemini-2.5-flash');
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({ model: modelName });
    }
    isDemo() {
        return false;
    }
    async callGemini(prompt, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const result = await this.model.generateContent(prompt);
                const response = result.response;
                return response.text();
            }
            catch (error) {
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
                    if (error?.message?.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED')) {
                        throw new Error('GEMINI_API_KEY must be a Google AI Studio API key, not an OAuth access token.');
                    }
                    throw new Error('Invalid Gemini API key. Please check your configuration.');
                }
                throw new Error(`AI generation failed: ${error?.message || 'Please check network and Gemini API key'}`);
            }
        }
        throw new Error('AI generation failed after multiple retries.');
    }
    parseJson(raw, fallback) {
        let cleaned = raw.trim();
        cleaned = cleaned
            .replace(/^```(?:json)?\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();
        try {
            return JSON.parse(cleaned);
        }
        catch {
            return fallback;
        }
    }
    async researchTopic(input) {
        const prompt = (0, research_prompt_1.buildResearchPrompt)(input);
        const raw = await this.callGemini(prompt);
        return this.parseJson(raw, {
            keyPoints: [],
            angles: [],
            importantConsiderations: [],
            potentialClaims: [],
            factualRisk: [],
        });
    }
    async generatePost(input, context) {
        const prompt = (0, writer_prompt_1.buildWriterPrompt)(input, context);
        const raw = await this.callGemini(prompt);
        return this.parseJson(raw, { title: input.topic, content: raw });
    }
    async critiquePost(post, input) {
        const prompt = (0, critic_prompt_1.buildCriticPrompt)(post, input);
        const raw = await this.callGemini(prompt);
        return this.parseJson(raw, {
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
    async improvePost(post, critique, input) {
        const prompt = (0, editor_prompt_1.buildEditorPrompt)(post, critique, input);
        const raw = await this.callGemini(prompt);
        return this.parseJson(raw, {
            title: input.topic,
            hook: post.split('\n')[0] || '',
            finalPost: post,
            hashtags: [],
            cta: '',
            warnings: [],
        });
    }
    async generateHook(post, instruction) {
        const prompt = (0, hook_prompt_1.buildHookPrompt)(post, instruction);
        const raw = await this.callGemini(prompt);
        return raw.trim();
    }
    async generateCTA(post, goal) {
        const prompt = (0, cta_prompt_1.buildCtaPrompt)(post, goal);
        const raw = await this.callGemini(prompt);
        return raw.trim();
    }
    async generateHashtags(post, topic) {
        const prompt = (0, hashtags_prompt_1.buildHashtagsPrompt)(post, topic);
        const raw = await this.callGemini(prompt);
        const parsed = this.parseJson(raw, []);
        if (Array.isArray(parsed))
            return parsed;
        return raw.match(/#[\w]+/g) || [];
    }
};
exports.GeminiProvider = GeminiProvider;
exports.GeminiProvider = GeminiProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiProvider);
//# sourceMappingURL=gemini.provider.js.map