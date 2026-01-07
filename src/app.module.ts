import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { JobsRunnerModule } from './jobs_runner/jobs_runner.module';
import { ProductsModule } from './products/products.module';
import { ProductsEntityModule } from './products_entity/products_entity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    JobsModule,
    JobsRunnerModule,
    ProductsModule,
    ProductsEntityModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
