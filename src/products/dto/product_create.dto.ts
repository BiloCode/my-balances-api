import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductCreateDto {
  @ApiProperty({
    type: String,
    format: 'mongo-objectid',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  entity_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  buy_date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  buy_price: number;

  @ApiProperty()
  @IsNumber()
  buy_quotas: number;

  @ApiProperty()
  @IsNumber()
  buy_quotas_price: number;
}
