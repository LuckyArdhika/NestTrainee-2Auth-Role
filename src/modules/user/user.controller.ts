import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req, Res, UseGuards, ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/database/_dto/user/create-user.dto';
import { Request, Response } from 'express';
import { Roles } from 'src/config/customDecorator/roles.decorator';
import { Role } from 'src/config/role/role.enum';
import { RolesGuard } from 'src/config/role/roles.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService) { }

  @Post('/register') // register
  async create(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    return await this.userService.create(createUserDto, res);
  }

  @Get() // get user info
  async findOne(@Req() req: Request) {
    // validate jwt here, after that return user info depend on id on jwt
    return await this.userService.findOne(req);
  }

  @UseGuards(LocalAuthGuard) // Guard to protect route? // 401, this route has protected by guard
  @ApiBearerAuth('JWT') // this decorator provide auth header with bearer scheme
  @Post('/login') // login
  async login(@Req() req: Request, @Body(new ValidationPipe()) loginUserDto: CreateUserDto, @Res({passthrough: true}) res: Response ){ // @Res({passthrough: true}) res: Response // plase add some dto as validator in prod mode
    console.log("Passing user controller...");
    return await this.authService.login(loginUserDto, res); // res
  }
  
  @ApiBearerAuth('JWT') // this decorator provide auth heafer with bearer scheme
  @UseGuards(JwtAuthGuard, RolesGuard) // validate role // jwtauthguard makes unauthorized why??
  @Get('/all') // Role-play, allow for admin role, dont allow for relative user.
  @Roles(Role.Admin)
  async showByRole(@Req() req: Request, @Res({passthrough: true}) res: Response){
    return await this.userService.showByRole(req, res);
  }
}