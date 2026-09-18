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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const ai_provider_1 = require("./providers/ai.provider");
let AiService = class AiService {
    constructor(provider) {
        this.provider = provider;
    }
    isDemo() {
        return this.provider.isDemo();
    }
    async runFullPipeline(input) {
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
        }
        catch (error) {
            console.error('AI provider failed:', error);
            throw new common_1.ServiceUnavailableException(error instanceof Error ? error.message : 'AI provider is unavailable');
        }
    }
    async critiquePost(post, input) {
        return this.provider.critiquePost(post, input);
    }
    async improvePost(post, critique, input) {
        return this.provider.improvePost(post, critique, input);
    }
    async generateHook(post, instruction) {
        return this.provider.generateHook(post, instruction);
    }
    async generateCTA(post, goal) {
        return this.provider.generateCTA(post, goal);
    }
    async generateHashtags(post, topic) {
        return this.provider.generateHashtags(post, topic);
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(ai_provider_1.AI_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], AiService);
//# sourceMappingURL=ai.service.js.map