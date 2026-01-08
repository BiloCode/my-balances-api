import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { JobDto } from './dto/job.dto';
import { JobCreateDto } from './dto/job_create.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly job: JobsService) {}

  @ApiOkResponse({ type: [JobDto] })
  @Get()
  findAll() {
    return this.job.findAll();
  }

  @ApiOkResponse({ type: JobDto })
  @Post()
  create(@Body() body: JobCreateDto) {
    return this.job.insertOne(body);
  }
}
