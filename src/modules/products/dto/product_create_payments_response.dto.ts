import { ApiProperty } from '@nestjs/swagger';

export class ProductCreatePaymentsResponseDto {
  @ApiProperty()
  success: boolean;
}
