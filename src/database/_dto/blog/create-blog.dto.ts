import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  slug?: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString({
    each: true,
  })
  @IsArray()
  tags: string[];
}
