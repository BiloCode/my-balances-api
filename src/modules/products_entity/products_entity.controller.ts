import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { ProductEntityDto } from './dto/product_entity.dto';
import { ProductsEntityService } from './products_entity.service';
import { ProductEntityCreateDto } from './dto/product_entity_create.dto';

@Controller('entity')
export class ProductsEntityController {
  constructor(private readonly entity: ProductsEntityService) {}

  @ApiOkResponse({ type: [ProductEntityDto] })
  @Get()
  findAll() {
    return this.entity.findAll();
  }

  @ApiOkResponse({ type: ProductEntityDto })
  @ApiBody({ type: ProductEntityCreateDto })
  @Post()
  create(@Body() body: ProductEntityCreateDto) {
    return this.entity.insertOne(body);
  }
}
