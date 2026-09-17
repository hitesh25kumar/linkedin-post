import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { PostStatus } from '../../database/schemas/post.schema';

export class CreatePostDto {
  @IsString()
  @MaxLength(500)
  topic: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  audience?: string;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsString()
  postType?: string;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  length?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  draftContent?: string;

  @IsOptional()
  @IsString()
  finalContent?: string;

  @IsOptional()
  @IsString()
  hook?: string;

  @IsOptional()
  @IsString()
  cta?: string;

  @IsOptional()
  @IsArray()
  hashtags?: string[];

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
