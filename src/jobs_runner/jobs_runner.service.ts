import { Injectable } from '@nestjs/common';
import { JobStatus, JobType } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

import { JobsService } from '@/jobs/jobs.service';
import { ProductsService } from '@/products/products.service';

import { ProductCreateDto } from '@/products/dto/product_create.dto';

@Injectable()
export class JobsRunnerService {
  constructor(
    private readonly job: JobsService,
    private readonly product: ProductsService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async scheduler() {
    const job = await this.job.findOneByStatus(JobStatus.Pending);

    if (job === null) {
      return;
    }

    console.log(`[JOB START] id=${job.id} type=${job.type}`);
    await this.job.updateOneByStatus(job.id, JobStatus.Processing);

    switch (job.type) {
      case JobType.Product: {
        let products: ProductCreateDto[] = [];
        let productsFailed: number = 0;

        try {
          products = JSON.parse(job.payload as string) as ProductCreateDto[];
        } catch {
          console.log(`[JOB PAYLOAD ERROR] id=${job.id} type=${job.type}`);
          await this.job.updateOneByStatus(job.id, JobStatus.Failed);
          return;
        }

        for (const product of products) {
          try {
            await this.product.insertOne(product);
          } catch {
            productsFailed += 1;
          }
        }

        if (productsFailed >= products.length) {
          console.log(`[JOB INSERT ERROR] id=${job.id} type=${job.type}`);
          await this.job.updateOneByStatus(job.id, JobStatus.Failed);
          return;
        }

        break;
      }
    }

    console.log(`[JOB DONE] id=${job.id} type=${job.type}`);
    await this.job.updateOneByStatus(job.id, JobStatus.Done);
  }
}
