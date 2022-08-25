import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config.module';
import { DatabaseService } from '../_services/database.service';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [AppConfigModule],
  inject: [DatabaseService],
  useFactory: async (
    databaseService: DatabaseService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: databaseService.get('type'),
    host: databaseService.get('host'),
    port: databaseService.get('port'),
    username: databaseService.get('username'),
    password: databaseService.get('password'),
    database: databaseService.get('database'),
    // entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    synchronize: databaseService.get('synchronize'),
    logging: databaseService.get('logging'),
    debug: databaseService.get('debug'),
    charset: 'utf8',
    timezone: '+07:00',
    useUTC: true,
  }),
};
