import { IsString, IsOptional, IsIn, MaxLength } from 'class-validator';

export class GeneratePostDto {
  @IsString()
  @MaxLength(500)
  topic!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  audience?: string;

  @IsOptional()
  @IsIn([
    'Professional',
    'Conversational',
    'Educational',
    'Storytelling',
    'Bold',
    'Thought-provoking',
    'Personal Branding',
  ])
  tone?: string;

  @IsOptional()
  @IsIn([
    'Industry Insight',
    'Educational',
    'Personal Story',
    'Product Management',
    'AI / Technology',
    'Career Advice',
    'How-To',
    'Case Study',
    'List',
    'Trend Analysis',
  ])
  postType?: string;

  @IsOptional()
  @IsIn([
    'Engagement',
    'Thought Leadership',
    'Education',
    'Personal Branding',
    'Lead Generation',
  ])
  goal?: string;

  @IsOptional()
  @IsIn(['Short', 'Medium', 'Long'])
  length?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  instructions?: string;
}
