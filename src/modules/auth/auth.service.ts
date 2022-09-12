import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/database/_dto/user/create-user.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(username: string): Promise<any> {
    console.log("AuthService validateUser is running...");
    const user = await this.userService.findOneByName(username);
    console.log("AuthService validateUser was done, now returning...");
    if (user && user.username === username) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: CreateUserDto, res) {
    // find in db
    console.log("Passing authService Login...");
    const user = await this.userService.findOneByName(body.username);
    // pass to jwt
    const payload = user.toJSON(); // data mentah dari database
    console.log("payload:", typeof payload);
    console.log("[AuthService Login will returning jwt key]...");
    const encoded = await this.jwtService.sign(payload, {secret: process.env.JWT_KEY});
    res.cookie('authorization', encoded);
    return {
      message: "Youre logged-in",
      bearer: encoded, // manual key declaration
    };
  }
}
