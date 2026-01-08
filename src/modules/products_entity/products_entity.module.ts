import { Module } from '@nestjs/common';

import { ProductsEntityService } from './products_entity.service';
import { ProductsEntityController } from './products_entity.controller';

@Module({
  providers: [ProductsEntityService],
  controllers: [ProductsEntityController],
})
export class ProductsEntityModule {}
