import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "thisisakey", // jwt key
      // secretOrPrivateKey: "thisisakey", // jwt key
    });
  }

  async validate(payload: any) {
    console.log("validate of jwtStrategy running...");
    return { userId: payload.sub, username: payload.username };
  }
}