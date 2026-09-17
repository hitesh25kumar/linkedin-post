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
exports.PostSchema = exports.Post = exports.PostStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var PostStatus;
(function (PostStatus) {
    PostStatus["DRAFT"] = "draft";
    PostStatus["REVIEW"] = "review";
    PostStatus["APPROVED"] = "approved";
    PostStatus["PUBLISHED"] = "published";
})(PostStatus || (exports.PostStatus = PostStatus = {}));
let Post = class Post {
};
exports.Post = Post;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Post.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Post.prototype, "topic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "audience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Professional' }),
    __metadata("design:type", String)
], Post.prototype, "tone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Industry Insight' }),
    __metadata("design:type", String)
], Post.prototype, "postType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Engagement' }),
    __metadata("design:type", String)
], Post.prototype, "goal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Medium' }),
    __metadata("design:type", String)
], Post.prototype, "length", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "instructions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "draftContent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "finalContent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "hook", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Post.prototype, "cta", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Post.prototype, "hashtags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Post.prototype, "aiAnalysis", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Post.prototype, "context", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: PostStatus, default: PostStatus.DRAFT }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], Post.prototype, "publishedAt", void 0);
exports.Post = Post = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Post);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
//# sourceMappingURL=post.schema.js.map