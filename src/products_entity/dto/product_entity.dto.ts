import { ApiProperty } from '@nestjs/swagger';

export class ProductEntityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  long_name: string;

  @ApiProperty()
  short_name: string;
}
