import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req, Res
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/database/_dto/user/create-user.dto';
import { Request, Response } from 'express';
import { Roles } from 'src/config/customDecorator/roles.decorator';
import { Role } from 'src/config/role/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post() // register
  async create(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    return await this.userService.create(createUserDto, res);
  }

  @Get() // get user info
  async find(@Req() req: Request) {
    // validate jwt here, after that return user info depend on id on jwt
    return await this.userService.find(req);
  }

  @Post('/login') // login
  async login(@Req() req: Request, @Res({passthrough: true}) res: Response){
    return await this.userService.login(req, res);
  }

  @Get('/all') // Role-play, allow for admin role, dont allow for relative user.
  @Roles(Role.Admin)
  async showByRole(@Req() req: Request, @Res({passthrough: true}) res: Response){
    return await this.userService.showByRole(req, res);
  }
}