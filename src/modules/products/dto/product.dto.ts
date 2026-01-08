import { ApiProperty } from '@nestjs/swagger';

export enum ProductDtoTagTheme {
  DANGER = 'danger',
  CUSTOM = 'custom',
  SUCCESS = 'success',
  WARNING = 'warning',
  DEFAULT = 'default',
}

export class ProductDtoTag {
  @ApiProperty({ example: 'Example' })
  title: string;

  @ApiProperty({
    enum: ProductDtoTagTheme,
    example: ProductDtoTagTheme.DEFAULT,
  })
  theme: ProductDtoTagTheme;
}

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  entity_id: string;

  @ApiProperty()
  record_id: string;

  @ApiProperty({ type: [ProductDtoTag] })
  tags: ProductDtoTag[];

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  buy_date: string;

  @ApiProperty()
  buy_price: number;

  @ApiProperty()
  buy_price_remaining: number;

  @ApiProperty()
  buy_payments_remaining: number;
}
