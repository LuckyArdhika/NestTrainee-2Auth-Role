import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateBlogDto } from 'src/database/_dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/database/_dto/blog/update-blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return await this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.blogService.remove(+id);
  }
}
