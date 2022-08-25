import { EntityRepository, Repository } from 'typeorm';
import { Blog } from '../_entities/blog/blog.entity';

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async findOneById(id: number) {
    return await this.findOne({
      where: { id },
    });
  }
}
