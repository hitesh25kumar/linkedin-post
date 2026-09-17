"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: configService.get('FRONTEND_URL', 'http://localhost:5173'),
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`LinkedIn AI Post Agent backend running on port ${port}`);
    const geminiKey = configService.get('GEMINI_API_KEY');
    if (!geminiKey) {
        console.log('⚠️  GEMINI_API_KEY not set — running in Demo Mode');
    }
    else {
        console.log('✅ Gemini AI connected');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map