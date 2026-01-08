import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProductRecordPayment {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  paid_date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paid_month: string;
}

export class ProductCreatePaymentsDto {
  @ApiProperty()
  @IsMongoId()
  product_id: string;

  @ApiProperty()
  @IsMongoId()
  product_record_id: string;

  @ApiProperty({ type: [ProductRecordPayment] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductRecordPayment)
  payments: ProductRecordPayment[];
}
