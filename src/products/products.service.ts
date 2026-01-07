import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductRecord } from '@prisma/client';

import { JobsService } from '@/jobs/jobs.service';
import { PrismaService } from '@/prisma/prisma.service';

import { ProductCreateDto } from './dto/product_create.dto';
import { ProductCreateJobDto } from './dto/product_create_job.dto';
import {
  ProductDto,
  ProductDtoTag,
  ProductDtoTagTheme,
} from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly job: JobsService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany({
      include: {
        records: true,
      },
    });

    return products.map((product) => this.productMapper(product));
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        records: true,
      },
    });

    if (product === null) {
      throw new NotFoundException(`Product id '${id}' not found`);
    }

    return this.productMapper(product);
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

      const records = await this.prisma.productRecord.create({
        data: {
          product_id: product.id,
          payments: [],
          payments_goals: product.buy_quotas,
        },
      });

      return this.productMapper({
        ...product,
        records: [records],
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

  private productMapper(
    product: Product & { records: ProductRecord[] },
  ): ProductDto {
    const buy_price_remaining =
      product.buy_price -
      product.records.reduce(
        (acc, record) =>
          acc + record.payments.length * product.buy_quotas_price,
        0,
      );

    const tags: ProductDtoTag[] = product.tags.map((title) => ({
      title,
      theme: ProductDtoTagTheme.DEFAULT,
    }));

    if (this.isDirectLoan(product.buy_quotas)) {
      tags.push({ title: 'Directo', theme: ProductDtoTagTheme.CUSTOM });
    } else if (this.isCreditLoan(product.buy_quotas)) {
      tags.push({ title: 'Credito', theme: ProductDtoTagTheme.CUSTOM });
    }

    return {
      id: product.id,
      title: product.title,
      tags,
      images: product.images,
      entity: product.entity_id,
      buy_date: product.buy_date.toISOString(),
      buy_price: product.buy_price,
      buy_price_remaining,
    };
  }

  private isCreditLoan(quotas: number) {
    return quotas > 1;
  }

  private isDirectLoan(quotas: number) {
    return quotas == 1;
  }
}
