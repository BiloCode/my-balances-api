import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class JobCreateDto {
  @ApiProperty({ type: Object })
  payload: Prisma.InputJsonValue;
}
