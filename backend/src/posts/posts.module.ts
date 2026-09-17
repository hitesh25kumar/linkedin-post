import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from '../database/schemas/post.schema';
import { AiModule } from '../ai/ai.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    AiModule,
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

