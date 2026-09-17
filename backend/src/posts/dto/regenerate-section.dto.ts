import { IsString, IsOptional } from 'class-validator';

export class RegenerateSectionDto {
  @IsString()
  post: string;

  @IsOptional()
  @IsString()
  instruction?: string;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  topic?: string;
}

