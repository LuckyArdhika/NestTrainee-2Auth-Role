import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseService } from './config/_services/database.service';
import { Blog } from './database/_entities/blog/blog.entity';
import { Images } from './database/_entities/blog/images.entity';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { User } from './database/_entities/user/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './config/role/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './modules/auth/strategy/jwt.strategy';
import { LocalStrategy } from './modules/auth/strategy/local.strategy';
dotenv.config();

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    // JwtModule.register({
    //   secret: `${process.env.JWT_KEY}`,
    //   // secretOrPrivateKey: 'thisisakey',
    //   signOptions: { expiresIn: '30m' },
    // }),
    MulterModule.register({
      dest: './storage/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
    }),
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (databaseService: DatabaseService) => ({
        type: databaseService.get('type'),
        host: databaseService.get('host'),
        port: databaseService.get('port'),
        username: databaseService.get('username'),
        password: databaseService.get('password'),
        database: databaseService.get('database'),
        // entities: [__dirname + '/**/*.entities.{js,ts}'],
        entities: [User, Blog, Images],
        synchronize: databaseService.get('synchronize'),
        logging: databaseService.get('logging'),
        debug: databaseService.get('debug'),
        charset: 'utf8',
        timezone: '+07:00',
        useUTC: true,
      }),
      inject: [DatabaseService],
    }),
    BlogModule, AuthModule, UserModule,
  ],
  // providers: [AuthService, JwtService, JwtStrategy, LocalStrategy]
})
export class AppModule {}
