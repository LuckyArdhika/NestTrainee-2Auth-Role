import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from 'src/database/_dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/database/_dto/blog/update-blog.dto';
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { Images } from 'src/database/_entities/blog/images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const images = await this.imageRepository.save( // save array into database?
      createBlogDto.images.map((i) => {
        return {
          name: i,
        };
      }),
    );

    console.log("imageRepository saved: ", images);

    const final = await this.blogsRepository.save({
      ...createBlogDto,
      images,
      tags_json: createBlogDto.tagso.join(','),
      slug:
        createBlogDto.slug ??
        createBlogDto.title.replace(/\s+/g, '-').toLowerCase(),
    });
    console.log("Final Result: ", final);
    // return final;
    return await this.findOne(final.id);
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

    const images = await this.imageRepository.save(
      updateBlogDto.images.map((i) => {
        return {
          name: i,
        };
      }),
    );

    const updatedBlog = await this.blogsRepository.save({
      ...blog,
      ...updateBlogDto,
      images,
      tags_json: updateBlogDto.tagso.join(','),
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
