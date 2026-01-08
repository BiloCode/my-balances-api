import { Injectable, NotFoundException } from '@nestjs/common';

import { JobsService } from '@/jobs/jobs.service';
import { PrismaService } from '@/prisma/prisma.service';

import { ProductMapper, ProductMapperDetail } from './utils/products.utils';

import { ProductDto } from './dto/product.dto';
import { ProductDetailDto } from './dto/product_detail.dto';
import { ProductCreateDto } from './dto/product_create.dto';
import { ProductCreateJobDto } from './dto/product_create_job.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly job: JobsService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany({
      include: {
        record: true,
      },
    });

    return products.map((product) => ProductMapper.parse(product));
  }

  async findDetail(id: string): Promise<ProductDetailDto> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        record: true,
      },
    });

    if (product === null) {
      throw new NotFoundException(`Product id '${id}' is not found`);
    }

    return ProductMapperDetail.parse(product);
  }

  async insertOne(dto: ProductCreateDto): Promise<ProductDto> {
    const result = await this.prisma.$transaction(async () => {
      const product = await this.prisma.product.create({
        data: {
          entity_id: dto.entity_id,
          title: dto.title,
          description: dto.description,
          tags: dto.tags,
          images: dto.images,
          buy_date: dto.buy_date,
          buy_price: dto.buy_price,
          buy_quotas: dto.buy_quotas,
          buy_quotas_price: dto.buy_quotas_price,
        },
      });

      const record = await this.prisma.productRecord.create({
        data: {
          product_id: product.id,
          payments: [],
        },
      });

      return ProductMapper.parse({
        ...product,
        record,
      });
    });

    return result;
  }

  async insertAll(dtos: ProductCreateDto[]): Promise<ProductCreateJobDto> {
    const job = await this.job.insertOne({
      payload: JSON.stringify(dtos),
    });

    return {
      job: {
        id: job.id,
        status: job.status,
      },
      created_at: job.created_at,
    };
  }
}
