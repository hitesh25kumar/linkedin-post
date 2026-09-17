import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { GeneratePostDto } from './dto/generate-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RegenerateSectionDto } from './dto/regenerate-section.dto';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('generate')
  generate(
    @CurrentUser() user: { sub: string },
    @Body() dto: GeneratePostDto,
  ) {
    return this.postsService.generatePost(user.sub, dto);
  }

  @Post('critique')
  critique(@Body() body: { post: string; tone?: string; audience?: string; goal?: string }) {
    return this.postsService.critiquePost(body);
  }

  @Post('improve')
  improve(@Body() body: { post: string; tone?: string; audience?: string; goal?: string }) {
    return this.postsService.improvePost(body);
  }

  @Post('generate-hook')
  generateHook(@Body() dto: RegenerateSectionDto) {
    return this.postsService.generateHook(dto.post, dto.instruction || 'Make it more compelling');
  }

  @Post('generate-cta')
  generateCTA(@Body() dto: RegenerateSectionDto) {
    return this.postsService.generateCTA(dto.post, dto.goal || 'Engagement');
  }

  @Post('generate-hashtags')
  generateHashtags(@Body() dto: RegenerateSectionDto) {
    return this.postsService.generateHashtags(dto.post, dto.topic || '');
  }

  @Get('stats')
  stats(@CurrentUser() user: { sub: string }) {
    return this.postsService.getDashboardStats(user.sub);
  }

  @Get()
  findAll(
    @CurrentUser() user: { sub: string },
    @Query('status') status?: string,
  ) {
    return this.postsService.findAll(user.sub, status);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { sub: string },
    @Param('id') id: string,
  ) {
    return this.postsService.findOne(user.sub, id);
  }

  @Post()
  create(
    @CurrentUser() user: { sub: string },
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.create(user.sub, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { sub: string },
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.update(user.sub, id, dto);
  }

  @Delete(':id')
  delete(
    @CurrentUser() user: { sub: string },
    @Param('id') id: string,
  ) {
    return this.postsService.delete(user.sub, id);
  }
}

