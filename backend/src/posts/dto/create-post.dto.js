"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
var class_validator_1 = require("class-validator");
var post_schema_1 = require("../../database/schemas/post.schema");
var CreatePostDto = function () {
    var _a;
    var _topic_decorators;
    var _topic_initializers = [];
    var _topic_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _audience_decorators;
    var _audience_initializers = [];
    var _audience_extraInitializers = [];
    var _tone_decorators;
    var _tone_initializers = [];
    var _tone_extraInitializers = [];
    var _postType_decorators;
    var _postType_initializers = [];
    var _postType_extraInitializers = [];
    var _goal_decorators;
    var _goal_initializers = [];
    var _goal_extraInitializers = [];
    var _length_decorators;
    var _length_initializers = [];
    var _length_extraInitializers = [];
    var _instructions_decorators;
    var _instructions_initializers = [];
    var _instructions_extraInitializers = [];
    var _draftContent_decorators;
    var _draftContent_initializers = [];
    var _draftContent_extraInitializers = [];
    var _finalContent_decorators;
    var _finalContent_initializers = [];
    var _finalContent_extraInitializers = [];
    var _hook_decorators;
    var _hook_initializers = [];
    var _hook_extraInitializers = [];
    var _cta_decorators;
    var _cta_initializers = [];
    var _cta_extraInitializers = [];
    var _hashtags_decorators;
    var _hashtags_initializers = [];
    var _hashtags_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePostDto() {
                this.topic = __runInitializers(this, _topic_initializers, void 0);
                this.title = (__runInitializers(this, _topic_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.audience = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _audience_initializers, void 0));
                this.tone = (__runInitializers(this, _audience_extraInitializers), __runInitializers(this, _tone_initializers, void 0));
                this.postType = (__runInitializers(this, _tone_extraInitializers), __runInitializers(this, _postType_initializers, void 0));
                this.goal = (__runInitializers(this, _postType_extraInitializers), __runInitializers(this, _goal_initializers, void 0));
                this.length = (__runInitializers(this, _goal_extraInitializers), __runInitializers(this, _length_initializers, void 0));
                this.instructions = (__runInitializers(this, _length_extraInitializers), __runInitializers(this, _instructions_initializers, void 0));
                this.draftContent = (__runInitializers(this, _instructions_extraInitializers), __runInitializers(this, _draftContent_initializers, void 0));
                this.finalContent = (__runInitializers(this, _draftContent_extraInitializers), __runInitializers(this, _finalContent_initializers, void 0));
                this.hook = (__runInitializers(this, _finalContent_extraInitializers), __runInitializers(this, _hook_initializers, void 0));
                this.cta = (__runInitializers(this, _hook_extraInitializers), __runInitializers(this, _cta_initializers, void 0));
                this.hashtags = (__runInitializers(this, _cta_extraInitializers), __runInitializers(this, _hashtags_initializers, void 0));
                this.status = (__runInitializers(this, _hashtags_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return CreatePostDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _topic_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _audience_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _postType_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _goal_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _length_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _instructions_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _draftContent_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _finalContent_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _hook_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _cta_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _hashtags_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)()];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(post_schema_1.PostStatus)];
            __esDecorate(null, null, _topic_decorators, { kind: "field", name: "topic", static: false, private: false, access: { has: function (obj) { return "topic" in obj; }, get: function (obj) { return obj.topic; }, set: function (obj, value) { obj.topic = value; } }, metadata: _metadata }, _topic_initializers, _topic_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _audience_decorators, { kind: "field", name: "audience", static: false, private: false, access: { has: function (obj) { return "audience" in obj; }, get: function (obj) { return obj.audience; }, set: function (obj, value) { obj.audience = value; } }, metadata: _metadata }, _audience_initializers, _audience_extraInitializers);
            __esDecorate(null, null, _tone_decorators, { kind: "field", name: "tone", static: false, private: false, access: { has: function (obj) { return "tone" in obj; }, get: function (obj) { return obj.tone; }, set: function (obj, value) { obj.tone = value; } }, metadata: _metadata }, _tone_initializers, _tone_extraInitializers);
            __esDecorate(null, null, _postType_decorators, { kind: "field", name: "postType", static: false, private: false, access: { has: function (obj) { return "postType" in obj; }, get: function (obj) { return obj.postType; }, set: function (obj, value) { obj.postType = value; } }, metadata: _metadata }, _postType_initializers, _postType_extraInitializers);
            __esDecorate(null, null, _goal_decorators, { kind: "field", name: "goal", static: false, private: false, access: { has: function (obj) { return "goal" in obj; }, get: function (obj) { return obj.goal; }, set: function (obj, value) { obj.goal = value; } }, metadata: _metadata }, _goal_initializers, _goal_extraInitializers);
            __esDecorate(null, null, _length_decorators, { kind: "field", name: "length", static: false, private: false, access: { has: function (obj) { return "length" in obj; }, get: function (obj) { return obj.length; }, set: function (obj, value) { obj.length = value; } }, metadata: _metadata }, _length_initializers, _length_extraInitializers);
            __esDecorate(null, null, _instructions_decorators, { kind: "field", name: "instructions", static: false, private: false, access: { has: function (obj) { return "instructions" in obj; }, get: function (obj) { return obj.instructions; }, set: function (obj, value) { obj.instructions = value; } }, metadata: _metadata }, _instructions_initializers, _instructions_extraInitializers);
            __esDecorate(null, null, _draftContent_decorators, { kind: "field", name: "draftContent", static: false, private: false, access: { has: function (obj) { return "draftContent" in obj; }, get: function (obj) { return obj.draftContent; }, set: function (obj, value) { obj.draftContent = value; } }, metadata: _metadata }, _draftContent_initializers, _draftContent_extraInitializers);
            __esDecorate(null, null, _finalContent_decorators, { kind: "field", name: "finalContent", static: false, private: false, access: { has: function (obj) { return "finalContent" in obj; }, get: function (obj) { return obj.finalContent; }, set: function (obj, value) { obj.finalContent = value; } }, metadata: _metadata }, _finalContent_initializers, _finalContent_extraInitializers);
            __esDecorate(null, null, _hook_decorators, { kind: "field", name: "hook", static: false, private: false, access: { has: function (obj) { return "hook" in obj; }, get: function (obj) { return obj.hook; }, set: function (obj, value) { obj.hook = value; } }, metadata: _metadata }, _hook_initializers, _hook_extraInitializers);
            __esDecorate(null, null, _cta_decorators, { kind: "field", name: "cta", static: false, private: false, access: { has: function (obj) { return "cta" in obj; }, get: function (obj) { return obj.cta; }, set: function (obj, value) { obj.cta = value; } }, metadata: _metadata }, _cta_initializers, _cta_extraInitializers);
            __esDecorate(null, null, _hashtags_decorators, { kind: "field", name: "hashtags", static: false, private: false, access: { has: function (obj) { return "hashtags" in obj; }, get: function (obj) { return obj.hashtags; }, set: function (obj, value) { obj.hashtags = value; } }, metadata: _metadata }, _hashtags_initializers, _hashtags_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePostDto = CreatePostDto;
