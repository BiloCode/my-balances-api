import { Module } from '@nestjs/common';

import { JobsModule } from '@/jobs/jobs.module';
import { ProductsModule } from '@/products/products.module';
import { JobsRunnerService } from '@/jobs_runner/jobs_runner.service';

@Module({
  imports: [ProductsModule, JobsModule],
  providers: [JobsRunnerService],
})
export class JobsRunnerModule {}
