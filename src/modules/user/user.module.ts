import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/_entities/user/user.entity";
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { Images } from 'src/database/_entities/blog/images.entity';
import { RolesGuard } from 'src/config/role/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UserController],
  providers:  [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User, Blog, Images])],
})
export class UserModule { }