import { Module } from '@nestjs/common';
import { useFactory } from 'src/config/typeorm/typeorm.config-migrations';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/config/_services/database.service';
import { AppConfigModule } from '../../config/app-config.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/_entities/user/user.entity';
import { Blog } from 'src/database/_entities/blog/blog.entity';
import { Images } from 'src/database/_entities/blog/images.entity';
import * as dotenv from 'dotenv';
import { UserService } from '../user/user.service';
dotenv.config();

@Module({
  imports: [
    // UserModule,
    PassportModule,
    // ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    // JwtModule.registerAsync({
    //   imports: [AppConfigModule],
    //   useFactory: async (databaseService: DatabaseService) => ({
    //     secret: databaseService.get('jwtkey'),
    //     signOptions: { expiresIn: '30m' }
    //   }),
    //   inject: [DatabaseService]
    // }),
    JwtModule.register({ // why register didnt work?
      secret: 'thisisakey',
      signOptions: {expiresIn: '30m'}
    }),
    TypeOrmModule.forFeature([User, Blog, Images])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService, TypeOrmModule.forFeature([User, Blog, Images])],
})
export class AuthModule {}