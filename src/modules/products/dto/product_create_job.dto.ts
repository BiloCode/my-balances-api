import { JobStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class ProductCreateJob {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: JobStatus;
}

export class ProductCreateJobDto {
  @ApiProperty()
  job: ProductCreateJob;

  @ApiProperty()
  created_at: string;
}
