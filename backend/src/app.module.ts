import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TemplatesModule } from './templates/templates.module';
import { SettingsModule } from './settings/settings.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/linkedin-agent',
        ),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    AiModule,
    PostsModule,
    TemplatesModule,
    SettingsModule,
  ],
})
export class AppModule {}
