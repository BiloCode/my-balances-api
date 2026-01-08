import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ProductDetailDto } from './dto/product_detail.dto';
import { ProductCreateDto } from './dto/product_create.dto';
import { ProductCreateJobDto } from './dto/product_create_job.dto';
import { ProductCreatePaymentsDto } from './dto/product_create_payments.dto';
import { ProductCreatePaymentsResponseDto } from './dto/product_create_payments_response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly product: ProductsService) {}

  @ApiOkResponse({ type: ProductDto, isArray: true })
  @Get()
  findAll() {
    return this.product.findAll();
  }

  @ApiOkResponse({ type: ProductDetailDto })
  @Get(':id')
  findDetail(@Param('id') id: string) {
    return this.product.findDetail(id);
  }

  @ApiOkResponse({ type: ProductDto })
  @Post()
  create(@Body() body: ProductCreateDto) {
    return this.product.insertOne(body);
  }

  @ApiOkResponse({ type: ProductCreateJobDto })
  @ApiBody({ type: [ProductCreateDto] })
  @Post('jobs')
  createAll(@Body() body: ProductCreateDto[]) {
    return this.product.insertAll(body);
  }

  @ApiOkResponse({ type: ProductCreatePaymentsResponseDto })
  @ApiBody({ type: ProductCreatePaymentsDto })
  @Patch('payments')
  createPayments(@Body() body: ProductCreatePaymentsDto) {
    return this.product.insertPayments(body);
  }
}
