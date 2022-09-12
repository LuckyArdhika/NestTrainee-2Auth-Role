import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from "src/database/_dto/user/create-user.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/_entities/user/user.entity';
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { Images } from 'src/database/_entities/blog/images.entity';
import { Request, Response } from 'express';
import { JWTTools } from 'src/middleware/jwtValidator.module';
import { JWTInterface } from 'src/config/_interface/interface.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) { }

  async create(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepository.save( // save array into database?
      {username: createUserDto.username, password: createUserDto.password, role: 'admin'}
    );
    const sign: JWTInterface = await JWTTools.sign(user);
    res.cookie('authorization', sign);
    return user; // id, name, createdAt
  }

  async findOne(req: Request){
    // validate jwt
    const decoded: JWTInterface = await JWTTools.auth(req.cookies);
    const user = await this.userRepository.findOneBy({
      id: decoded.id
    });
    return user; // id, name, createdAt, blogs
  }

  // login
  async login(req: Request, res: Response) {
    const user = await this.userRepository.findOne({
      where: {
        username:  req.body.username
      }
    });
    if (!user) return {message: "Youre not registered, please register at /user first."}; // why didnt returning this?
    const sign: JWTInterface = await JWTTools.sign(user);
    res.cookie('authorization', sign);
    return {message: "Youre logged in!"};
  }

  async showByRole(req: Request, res: Response) { // access by admin only
    const users = await this.userRepository.find();
    return users;
  }

  // used by auth.service
  async findOneByName(username){
    console.log("running userService findOneByName...");
    const user = await this.userRepository.findOne({where: {username: username}});
    if (!user) throw new NotFoundException("Pengguna tidak ditemukan");
    return user;
  }
  
  // used by auth.service
  async findMatchedCredentials(body){
    console.log("running userService findMatchedCredential...");
    const user = await this.userRepository.findOne({where: {username: body.username, password: body.password}});
    return user;
  }
}