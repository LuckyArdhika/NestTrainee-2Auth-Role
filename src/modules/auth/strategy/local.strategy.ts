import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string): Promise<any> {
    console.log("LocalStrategy validate() has running will validate user in authService...");
    const user = await this.authService.validateUser(username);
    console.log("LocalStrategy has done validated, now returning...");
    if (!user) {
      console.log("Null user");
      throw new UnauthorizedException("User not found - L");
    }
    return user; // return req.user to the route
  }
}