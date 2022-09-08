import { ApiProperty } from '@nestjs/swagger';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Images } from './images.entity';

@Entity()
export class Blog extends BaseEntity {
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
  @ApiProperty({ type: 'string' })
  title: string;

  @Column()
  @ApiProperty({ type: 'string' })
  slug: string;

  @Column()
  @ApiProperty({ type: 'string' })
  content: string;

  @Column()
  @ApiProperty({ type: 'string' })
  description: string;

  @Column()
  @Exclude()
  @ApiProperty({ type: 'string' })
  tags_json: string;

  @Expose()
  get tags(): string[] {
    if (this.tags_json?.length <= 0) return [];
    return this.tags_json ? this.tags_json.split(',') : [];
  }

  @OneToMany(() => Images, (image) => image.blog)
  images: Images[];

  toJSON() {
    return classToPlain(this);
  }
}
