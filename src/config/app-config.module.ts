import { Module } from '@nestjs/common';
import { DatabaseService } from './_services/database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class AppConfigModule {}
