import { Module } from '@nestjs/common';

import { JobsModule } from '@/jobs/jobs.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [JobsModule],
  exports: [ProductsService],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
