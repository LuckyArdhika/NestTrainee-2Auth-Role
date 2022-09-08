import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from 'src/database/_entities/blog/images.entity';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
  imports: [TypeOrmModule.forFeature([Blog, Images])],
})
export class BlogModule {}
