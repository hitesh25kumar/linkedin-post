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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const template_schema_1 = require("../database/schemas/template.schema");
const DEFAULT_TEMPLATES = [
    {
        name: 'Product Management Insight',
        description: 'Share a product management observation or lesson learned',
        tone: 'Professional',
        postType: 'Product Management',
        instructions: 'Focus on a specific PM challenge or observation. Be practical.',
        isDefault: true,
    },
    {
        name: 'AI Trend',
        description: 'Comment on an AI development or trend',
        tone: 'Thought-provoking',
        postType: 'AI / Technology',
        instructions: 'Share a thoughtful perspective on AI. Avoid hype. Focus on practical implications.',
        isDefault: true,
    },
    {
        name: 'Industry Insight',
        description: 'Share an observation about your industry',
        tone: 'Professional',
        postType: 'Industry Insight',
        instructions: 'Offer a specific, non-obvious observation. Support with reasoning, not statistics.',
        isDefault: true,
    },
    {
        name: 'Career Advice',
        description: 'Share career advice or a professional lesson',
        tone: 'Conversational',
        postType: 'Career Advice',
        instructions: 'Be specific and honest. Avoid generic advice. Draw from real experience where possible.',
        isDefault: true,
    },
    {
        name: 'Educational Post',
        description: 'Teach something valuable to your audience',
        tone: 'Educational',
        postType: 'Educational',
        instructions: 'Break down a concept clearly. Use examples. Prioritize clarity over comprehensiveness.',
        isDefault: true,
    },
    {
        name: 'Personal Story',
        description: 'Share a professional story or experience',
        tone: 'Storytelling',
        postType: 'Personal Story',
        instructions: 'Be genuine. Focus on the lesson, not the drama. Keep it professional.',
        isDefault: true,
    },
    {
        name: 'How-To',
        description: 'Explain how to do something practical',
        tone: 'Educational',
        postType: 'How-To',
        instructions: 'Be specific and actionable. Number steps where helpful. End with the outcome.',
        isDefault: true,
    },
    {
        name: 'Case Study',
        description: 'Walk through a real or hypothetical case study',
        tone: 'Professional',
        postType: 'Case Study',
        instructions: 'Structure: problem → approach → result → lesson. Be specific.',
        isDefault: true,
    },
];
let TemplatesService = class TemplatesService {
    constructor(templateModel) {
        this.templateModel = templateModel;
    }
    async onModuleInit() {
        const count = await this.templateModel.countDocuments({ isDefault: true });
        if (count === 0) {
            await this.templateModel.insertMany(DEFAULT_TEMPLATES);
        }
    }
    async findAll(userId) {
        return this.templateModel.find({
            $or: [{ isDefault: true }, { userId: new mongoose_2.Types.ObjectId(userId) }],
        }).sort({ isDefault: -1, createdAt: -1 }).lean();
    }
    async create(userId, dto) {
        return this.templateModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            ...dto,
            isDefault: false,
        });
    }
    async update(userId, id, dto) {
        const template = await this.templateModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(id), userId: new mongoose_2.Types.ObjectId(userId), isDefault: false }, { $set: dto }, { new: true });
        if (!template)
            throw new common_1.NotFoundException('Template not found or cannot be modified');
        return template;
    }
    async delete(userId, id) {
        const result = await this.templateModel.findOneAndDelete({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
            isDefault: false,
        });
        if (!result)
            throw new common_1.NotFoundException('Template not found or cannot be deleted');
        return { deleted: true };
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(template_schema_1.Template.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map