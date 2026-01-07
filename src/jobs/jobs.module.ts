import { Module } from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';

@Module({
  exports: [JobsService],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
