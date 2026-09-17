"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
var SAMPLE_POST = "AI agents won't replace Product Managers.\n\nBut Product Managers who know how to work with AI agents may move much faster.\n\nThink about what a PM spends time doing every week:\n\n\u2192 Reading customer feedback\n\u2192 Analyzing product data\n\u2192 Writing PRDs\n\u2192 Creating user stories\n\u2192 Preparing meeting notes\n\nA lot of this work isn't necessarily product strategy.\n\nIt's information processing.\n\nThat's where AI agents become interesting.\n\nInstead of simply asking AI to summarize 50 customer complaints, an agent can help categorize them, identify patterns and surface areas that deserve deeper investigation.\n\nThe PM can then spend more time asking: \"What should we actually build?\"\n\nThat's the shift I find most interesting.\n\nAI isn't just making individual tasks faster.\n\nIt's changing where product managers can spend their time creating value.";
var MockProvider = /** @class */ (function () {
    function MockProvider() {
    }
    MockProvider.prototype.isDemo = function () {
        return true;
    };
    MockProvider.prototype.researchTopic = function (_input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(800)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                keyPoints: [
                                    'AI agents are transforming how professionals work',
                                    'Information processing is a major time sink for knowledge workers',
                                    'The shift is from doing tasks to directing agents',
                                ],
                                angles: [
                                    'Productivity angle: how much time can AI save?',
                                    'Strategic angle: what new capabilities does this unlock?',
                                    'Human angle: what skills become more valuable?',
                                ],
                                importantConsiderations: [
                                    'AI agents are tools, not replacements',
                                    'Quality of output depends on quality of direction',
                                ],
                                potentialClaims: [
                                    'PMs spend 40-60% of time on information processing (unverified)',
                                ],
                                factualRisk: [
                                    'Statistics about time allocation are estimates — do not present as verified data',
                                ],
                            }];
                }
            });
        });
    };
    MockProvider.prototype.generatePost = function (input, _context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(1200)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                title: input.topic || 'AI in Professional Work',
                                content: SAMPLE_POST,
                            }];
                }
            });
        });
    };
    MockProvider.prototype.critiquePost = function (_post, _input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(800)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                overallScore: 8.5,
                                hookScore: 8,
                                clarityScore: 9,
                                valueScore: 8,
                                authenticityScore: 9,
                                engagementScore: 8.5,
                                strengths: [
                                    'Strong, provocative opening hook',
                                    'Clear and readable structure',
                                    'Avoids generic AI buzzwords',
                                    'Honest about what AI can and cannot do',
                                ],
                                weaknesses: [
                                    'Could include a more concrete real-world example',
                                    'The closing could be slightly stronger',
                                ],
                                suggestions: [
                                    'Consider adding a specific scenario where an agent helped with customer feedback',
                                    'The CTA could directly invite readers to share their experience',
                                ],
                                factualWarnings: [
                                    'The time allocation percentages are estimates — removed from post to avoid unverified claims',
                                ],
                            }];
                }
            });
        });
    };
    MockProvider.prototype.improvePost = function (_post, _critique, input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                title: input.topic || 'AI in Professional Work',
                                hook: "AI agents won't replace Product Managers.",
                                finalPost: SAMPLE_POST,
                                hashtags: [
                                    '#ProductManagement',
                                    '#AI',
                                    '#AIAgents',
                                    '#ProductManager',
                                    '#FutureOfWork',
                                ],
                                cta: "How are you thinking about AI agents in your work? I'd love to hear your perspective.",
                                warnings: [],
                            }];
                }
            });
        });
    };
    MockProvider.prototype.generateHook = function (_post, _instruction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(600)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'Most people are asking the wrong question about AI in product management.'];
                }
            });
        });
    };
    MockProvider.prototype.generateCTA = function (_post, _goal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(600)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "What's your take? I'd love to hear how you're thinking about this."];
                }
            });
        });
    };
    MockProvider.prototype.generateHashtags = function (_post, _topic) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, [
                                '#ProductManagement',
                                '#AI',
                                '#AIAgents',
                                '#ProductManager',
                                '#FutureOfWork',
                            ]];
                }
            });
        });
    };
    MockProvider.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return MockProvider;
}());
exports.MockProvider = MockProvider;
