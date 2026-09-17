"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ai_service_1 = require("./ai.service");
const gemini_provider_1 = require("./providers/gemini.provider");
const mock_provider_1 = require("./providers/mock.provider");
const ai_provider_1 = require("./providers/ai.provider");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: ai_provider_1.AI_PROVIDER,
                useFactory: (configService) => {
                    const apiKey = configService.get('GEMINI_API_KEY');
                    if (apiKey) {
                        return new gemini_provider_1.GeminiProvider(configService);
                    }
                    return new mock_provider_1.MockProvider();
                },
                inject: [config_1.ConfigService],
            },
            ai_service_1.AiService,
        ],
        exports: [ai_service_1.AiService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map