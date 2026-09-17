import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';
import { GeminiProvider } from './providers/gemini.provider';
import { MockProvider } from './providers/mock.provider';
import { AI_PROVIDER } from './providers/ai.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: AI_PROVIDER,
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('GEMINI_API_KEY');
        if (apiKey) {
          return new GeminiProvider(configService);
        }
        return new MockProvider();
      },
      inject: [ConfigService],
    },
    AiService,
  ],
  exports: [AiService],
})
export class AiModule {}
