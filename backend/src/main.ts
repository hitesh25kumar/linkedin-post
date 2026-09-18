import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const configuredOrigins = configService
    .get<string>('FRONTEND_URL', 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([
    ...configuredOrigins,
    'https://linkedin-creations.web.app',
    'https://linkedin-creations.firebaseapp.com',
  ]);

  app.enableCors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin || allowedOrigins.has(requestOrigin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`LinkedIn AI Post Agent backend running on port ${port}`);

  const geminiKey = configService.get('GEMINI_API_KEY');
  if (!geminiKey) {
    console.log('⚠️  GEMINI_API_KEY not set — running in Demo Mode');
  } else {
    console.log('✅ Gemini AI connected');
  }
}

bootstrap();
