import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
  imports: [TypeOrmModule.forFeature([Blog])],
})
export class BlogModule {}
