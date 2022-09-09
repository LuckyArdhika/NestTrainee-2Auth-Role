import { Injectable, NestMiddleware, Logger, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTInterface } from 'src/config/_interface/interface.config';
require('dotenv').config();
const jwt = require('jsonwebtoken');

@Injectable()
export class JWTTools {
  static async auth(cookies): Promise<JWTInterface> {
    // authenticate user token
    try {
      const verified: JWTInterface = await jwt.verify(cookies.key, process.env.JWT_KEY);
      console.log("Verified: ", verified);
      return verified;
    } catch (err) {
      throw new UnauthorizedException(err.message)
    }
  }

  static async sign(user): Promise<JWTInterface> {
    try {
      const signed = jwt.sign({
        user
      }, process.env.JWT_KEY, {expiresIn: '1d'});
      return signed;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}