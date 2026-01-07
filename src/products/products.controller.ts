import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ProductCreateDto } from './dto/product_create.dto';
import { ProductCreateJobDto } from './dto/product_create_job.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly product: ProductsService) {}

  @ApiOkResponse({ type: ProductDto, isArray: true })
  @Get()
  findAll() {
    return this.product.findAll();
  }

  @ApiOkResponse({ type: ProductDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.product.findOne(id);
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
}
