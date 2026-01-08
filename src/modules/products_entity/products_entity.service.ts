import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { ProductEntityDto } from './dto/product_entity.dto';
import { ProductEntityCreateDto } from './dto/product_entity_create.dto';

@Injectable()
export class ProductsEntityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductEntityDto[]> {
    const entities = await this.prisma.productEntity.findMany();

    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      long_name: entity.long_name ?? '',
      short_name: entity.short_name ?? '',
    }));
  }

  async insertOne(dto: ProductEntityCreateDto): Promise<ProductEntityDto> {
    const entity = await this.prisma.productEntity.create({
      data: {
        name: dto.name,
        long_name: dto.long_name,
        short_name: dto.short_name,
      },
    });

    return {
      id: entity.id,
      name: entity.name,
      long_name: entity.long_name ?? '',
      short_name: entity.short_name ?? '',
    };
  }
}
