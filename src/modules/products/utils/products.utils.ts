import { Product, ProductRecord } from '@prisma/client';
import { addMonths, format, setDate } from 'date-fns';

import { getDateRange } from '@/common/utils/date';

import {
  ProductDto,
  ProductDtoTag,
  ProductDtoTagTheme,
} from '../dto/product.dto';

import {
  ProductDetailDto,
  ProductDetailRecordStatus,
} from '../dto/product_detail.dto';

export class ProductMapper {
  static parse(
    product: Product & { record: ProductRecord | null },
  ): ProductDto {
    const buy_price_remaining =
      product.buy_price -
      (product.record?.payments.length ?? 0) * product.buy_quotas_price;

    const tags: ProductDtoTag[] = product.tags.map((title) => ({
      title,
      theme: ProductDtoTagTheme.DEFAULT,
    }));

    if (ProductDomain.isDirectLoan(product.buy_quotas)) {
      tags.push({ title: 'Directo', theme: ProductDtoTagTheme.CUSTOM });
    } else if (ProductDomain.isCreditLoan(product.buy_quotas)) {
      tags.push({ title: 'Credito', theme: ProductDtoTagTheme.CUSTOM });
    }

    return {
      id: product.id,
      title: product.title,
      description: product.description ?? '',
      tags,
      images: product.images,
      entity: product.entity_id,
      buy_date: product.buy_date.toISOString(),
      buy_price: product.buy_price,
      buy_price_remaining,
    };
  }
}

export class ProductMapperDetail {
  static parse(
    product: Product & { record: ProductRecord | null },
  ): ProductDetailDto {
    const startDate =
      product.buy_date.getDate() > 10
        ? addMonths(product.buy_date, 1)
        : product.buy_date;

    const payments = getDateRange(startDate, product.buy_quotas).map((v) => ({
      paid_month: format(v, 'yyyy-MM'),
      paid_min_active_date: setDate(v, 25).toISOString(),
      paid_max_active_date: setDate(addMonths(v, 1), 10).toISOString(),
    }));

    const payments_status = payments.reduce((acc, cc) => {
      if (product.record?.payments.find((v) => v.paid_month == cc.paid_month)) {
        acc[cc.paid_month] = ProductDetailRecordStatus.Completed;
      } else {
        acc[cc.paid_month] = ProductDetailRecordStatus.Pending;
      }
      return acc;
    }, {});

    return {
      buy_quotas: product.buy_quotas,
      buy_quotas_price: product.buy_quotas_price,
      buy_record: {
        id: product.record?.id || null,
        payments,
        payments_status,
      },
    };
  }
}

export class ProductDomain {
  static isCreditLoan(quotas: number) {
    return quotas > 1;
  }

  static isDirectLoan(quotas: number) {
    return quotas == 1;
  }
}
