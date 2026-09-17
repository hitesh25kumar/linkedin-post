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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const generate_post_dto_1 = require("./dto/generate-post.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const regenerate_section_dto_1 = require("./dto/regenerate-section.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    generate(user, dto) {
        return this.postsService.generatePost(user.sub, dto);
    }
    critique(body) {
        return this.postsService.critiquePost(body);
    }
    improve(body) {
        return this.postsService.improvePost(body);
    }
    generateHook(dto) {
        return this.postsService.generateHook(dto.post, dto.instruction || 'Make it more compelling');
    }
    generateCTA(dto) {
        return this.postsService.generateCTA(dto.post, dto.goal || 'Engagement');
    }
    generateHashtags(dto) {
        return this.postsService.generateHashtags(dto.post, dto.topic || '');
    }
    stats(user) {
        return this.postsService.getDashboardStats(user.sub);
    }
    findAll(user, status) {
        return this.postsService.findAll(user.sub, status);
    }
    findOne(user, id) {
        return this.postsService.findOne(user.sub, id);
    }
    create(user, dto) {
        return this.postsService.create(user.sub, dto);
    }
    update(user, id, dto) {
        return this.postsService.update(user.sub, id, dto);
    }
    delete(user, id) {
        return this.postsService.delete(user.sub, id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_post_dto_1.GeneratePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)('critique'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "critique", null);
__decorate([
    (0, common_1.Post)('improve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "improve", null);
__decorate([
    (0, common_1.Post)('generate-hook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regenerate_section_dto_1.RegenerateSectionDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "generateHook", null);
__decorate([
    (0, common_1.Post)('generate-cta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regenerate_section_dto_1.RegenerateSectionDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "generateCTA", null);
__decorate([
    (0, common_1.Post)('generate-hashtags'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regenerate_section_dto_1.RegenerateSectionDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "generateHashtags", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "delete", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map