import { ApiProperty } from '@nestjs/swagger';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number' })
  id: number;

  @CreateDateColumn()
  @ApiProperty({ type: Date })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ type: Date })
  updated_at: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  @ApiProperty()
  name: string;

  @ManyToOne(() => Blog, (blog) => blog.images)
  blog: Blog;

  toJSON() {
    return classToPlain(this);
  }
}
