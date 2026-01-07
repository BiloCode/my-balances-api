import { Injectable } from '@nestjs/common';
import { JobStatus, JobType } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';

import { JobDto } from './dto/job.dto';
import { JobCreateDto } from './dto/job_create.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<JobDto[]> {
    return (await this.prisma.job.findMany()).map((v) => ({
      id: v.id,
      type: v.type,
      status: v.status,
      created_at: v.createdAt.toISOString(),
    }));
  }

  async findOneByStatus(status: JobStatus) {
    return await this.prisma.job.findFirst({ where: { status } });
  }

  async insertOne(dto: JobCreateDto): Promise<JobDto> {
    const job = await this.prisma.job.create({
      data: {
        type: JobType.Product,
        status: JobStatus.Pending,
        payload: dto.payload,
      },
    });

    return {
      id: job.id,
      type: job.type,
      status: job.status,
      created_at: job.createdAt.toISOString(),
    };
  }

  async updateOneByStatus(id: string, status: JobStatus) {
    return await this.prisma.job.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
