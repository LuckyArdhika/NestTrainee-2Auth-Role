import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigDatabaseInterface } from '../_interface/interface.config';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) { }

  /**
   * Get all database config
   */
  public config(): ConfigDatabaseInterface {
    return {
      type: this.configService.get<string>('DB_CONNECTION'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_DATABASE'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      synchronize: this.configService.get<boolean>('DB_SYNC'),
      logging: this.configService.get<boolean>('DB_LOGGING'),
      debug: this.configService.get<boolean>('DB_DEBUG'),
      jwtkey: this.configService.get<string>('JWT_KEY')
    };
  }

  /**
   * Get sepecific database config
   */
  public get(key: string): any {
    return this.config()[key];
  }
}
