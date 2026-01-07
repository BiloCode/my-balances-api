import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class ProductEntityCreateDto {
  @ApiProperty()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsOptional()
  long_name?: string;

  @ApiProperty()
  @IsOptional()
  short_name?: string;
}
