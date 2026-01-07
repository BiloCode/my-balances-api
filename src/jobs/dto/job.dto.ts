import { ApiProperty } from '@nestjs/swagger';
import { JobStatus, JobType } from '@prisma/client';

export class JobDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: JobType;

  @ApiProperty()
  status: JobStatus;

  @ApiProperty()
  created_at: string;
}
