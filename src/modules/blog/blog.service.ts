import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from 'src/database/_dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/database/_dto/blog/update-blog.dto';
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    return await this.blogsRepository.save({
      ...createBlogDto,
      tags_json: createBlogDto.tags.join(','),
      slug:
        createBlogDto.slug ??
        createBlogDto.title.replace(/\s+/g, '-').toLowerCase(),
    });
  }

  async findAll() {
    return await this.blogsRepository.find();
  }

  async findOne(id: number) {
    return await this.blogsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.findOne(id);
    if (!blog) throw new NotFoundException(`Blog with ID "${id}" not found`);

    const updatedBlog = await this.blogsRepository.save({
      ...blog,
      ...updateBlogDto,
      tags_json: updateBlogDto.tags.join(','),
      slug:
        updateBlogDto.slug ??
        updateBlogDto.title.replace(/\s+/g, '-').toLowerCase(),
    });

    return await this.findOne(updatedBlog.id);
  }

  async remove(id: number) {
    const blog = await this.findOne(id);
    if (!blog) throw new NotFoundException(`Blog with ID "${id}" not found`);

    await blog.softRemove();
    return {
      message: `Blog with ID ${id} removed`,
      status: 'success',
    };
  }
}
