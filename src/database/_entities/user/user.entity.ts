import { ApiProperty } from '@nestjs/swagger';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from '../blog/blog.entity';
import { Role } from 'src/config/role/role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number' })
  id: number;
  
  @Column()
  @ApiProperty({ type: 'string' })
  username: string;
  
  @Column()
  @ApiProperty({ type: 'string' })
  password: string;

  @CreateDateColumn()
  @ApiProperty({ type: Date })
  created_at: Date;

  // relational
  @OneToMany(() => Blog, (blog) => blog.user)
  blog: Blog[];

  @Column()
  role: string;

  roles: Role[];
  
  toJSON() {
    return classToPlain(this);
  }
}