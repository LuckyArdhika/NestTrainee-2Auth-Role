import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/_entities/user/user.entity";
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { Images } from 'src/database/_entities/blog/images.entity';
import { RolesGuard } from 'src/config/role/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers:  [ // you just need to import authmodule with authservice exported to prevent recreate of authservice
    UserService,
    //  AuthService, JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  exports: [UserService],
  imports: [AuthModule],
})
export class UserModule { }