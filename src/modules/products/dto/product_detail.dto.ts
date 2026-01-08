import { ApiProperty } from '@nestjs/swagger';

export enum ProductDetailRecordStatus {
  Pending,
  Completed,
}

export class ProductDetailRecordPayment {
  @ApiProperty()
  paid_month: string;

  @ApiProperty()
  paid_min_active_date: string;

  @ApiProperty()
  paid_max_active_date: string;
}

export class ProductDetailRecord {
  @ApiProperty({ type: String, nullable: true })
  id: string | null;

  @ApiProperty({ type: [ProductDetailRecordPayment] })
  payments: ProductDetailRecordPayment[];

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'string',
      enum: Object.values(ProductDetailRecordStatus),
    },
  })
  payments_status: Record<string, ProductDetailRecordStatus>;
}

export class ProductDetailDto {
  @ApiProperty()
  buy_quotas: number;

  @ApiProperty()
  buy_quotas_price: number;

  @ApiProperty()
  buy_record: ProductDetailRecord;
}
