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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("../database/schemas/post.schema");
const ai_service_1 = require("../ai/ai.service");
let PostsService = class PostsService {
    constructor(postModel, aiService) {
        this.postModel = postModel;
        this.aiService = aiService;
    }
    async generatePost(userId, dto) {
        const input = {
            topic: dto.topic,
            audience: dto.audience || 'Professionals',
            tone: dto.tone || 'Professional',
            postType: dto.postType || 'Industry Insight',
            goal: dto.goal || 'Engagement',
            length: dto.length || 'Medium',
            instructions: dto.instructions || '',
        };
        const result = await this.aiService.runFullPipeline(input);
        const post = await this.postModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            title: result.improved.title || dto.topic,
            topic: dto.topic,
            audience: dto.audience,
            tone: dto.tone,
            postType: dto.postType,
            goal: dto.goal,
            length: dto.length,
            instructions: dto.instructions,
            draftContent: result.draftContent,
            finalContent: result.improved.finalPost,
            hook: result.improved.hook,
            cta: result.improved.cta,
            hashtags: result.improved.hashtags,
            aiAnalysis: result.critique,
            context: result.context,
            status: post_schema_1.PostStatus.DRAFT,
        });
        return {
            postId: post._id.toString(),
            title: post.title,
            draftContent: result.draftContent,
            context: result.context,
            critique: result.critique,
            improved: result.improved,
            status: post.status,
            isDemo: result.isDemo,
        };
    }
    async critiquePost(dto) {
        return this.aiService.critiquePost(dto.post, {
            topic: '',
            audience: dto.audience || 'Professionals',
            tone: dto.tone || 'Professional',
            postType: 'Industry Insight',
            goal: dto.goal || 'Engagement',
            length: 'Medium',
            instructions: '',
        });
    }
    async improvePost(dto) {
        const input = {
            topic: '',
            audience: dto.audience || 'Professionals',
            tone: dto.tone || 'Professional',
            postType: 'Industry Insight',
            goal: dto.goal || 'Engagement',
            length: 'Medium',
            instructions: '',
        };
        const critique = await this.aiService.critiquePost(dto.post, input);
        return this.aiService.improvePost(dto.post, critique, input);
    }
    async generateHook(post, instruction) {
        return { hook: await this.aiService.generateHook(post, instruction) };
    }
    async generateCTA(post, goal) {
        return { cta: await this.aiService.generateCTA(post, goal) };
    }
    async generateHashtags(post, topic) {
        return { hashtags: await this.aiService.generateHashtags(post, topic) };
    }
    async findAll(userId, status) {
        const filter = { userId: new mongoose_2.Types.ObjectId(userId) };
        if (status)
            filter.status = status;
        return this.postModel.find(filter).sort({ createdAt: -1 }).lean();
    }
    async findOne(userId, postId) {
        const post = await this.postModel.findOne({
            _id: new mongoose_2.Types.ObjectId(postId),
            userId: new mongoose_2.Types.ObjectId(userId),
        }).lean();
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async create(userId, dto) {
        return this.postModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            ...dto,
        });
    }
    async update(userId, postId, dto) {
        const post = await this.postModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(postId), userId: new mongoose_2.Types.ObjectId(userId) }, { $set: dto }, { new: true });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async delete(userId, postId) {
        const result = await this.postModel.findOneAndDelete({
            _id: new mongoose_2.Types.ObjectId(postId),
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        if (!result)
            throw new common_1.NotFoundException('Post not found');
        return { deleted: true };
    }
    async getDashboardStats(userId) {
        const uid = new mongoose_2.Types.ObjectId(userId);
        const [total, drafts, published, thisMonth] = await Promise.all([
            this.postModel.countDocuments({ userId: uid }),
            this.postModel.countDocuments({ userId: uid, status: post_schema_1.PostStatus.DRAFT }),
            this.postModel.countDocuments({ userId: uid, status: post_schema_1.PostStatus.PUBLISHED }),
            this.postModel.countDocuments({
                userId: uid,
                createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
            }),
        ]);
        return { total, drafts, published, thisMonth };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        ai_service_1.AiService])
], PostsService);
//# sourceMappingURL=posts.service.js.map