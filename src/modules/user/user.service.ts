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
      {name: createUserDto.name, role: 'user'}
    );
    const sign: JWTInterface = await JWTTools.sign(user);
    res.cookie('key', sign);
    return user; // id, name, createdAt
  }

  async find(req: Request){
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
        name:  req.body.name
      }
    });
    if (!user) return {message: "Youre not registered, please register at /user first."}; // why didnt returning this?
    const sign: JWTInterface = await JWTTools.sign(user);
    res.cookie('key', sign);
    return {message: "Youre logged in!"};
  }

  async showByRole(req: Request, res: Response) { // access by admin only
    const users = await this.userRepository.find();
    return users;
  }
}