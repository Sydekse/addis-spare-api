import {
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import {
  CreateReportDto,
  Filter,
  FilterTypeEnum,
} from 'src/modules/report/application/dto/create-report.dto';
import { UpdateReportDto } from 'src/modules/report/application/dto/update-report.dto';

// Report pipe that validates filters based on type
export class ReportPipe
  implements PipeTransform<CreateReportDto | UpdateReportDto>
{
  transform(
    value: CreateReportDto | UpdateReportDto,
  ): CreateReportDto | UpdateReportDto {
    // If type or filters are missing, skip validation because it was / is supposed to fail in the ValidationPipe
    if (
      !value ||
      typeof value !== 'object' ||
      !('type' in value) ||
      !('filters' in value)
    ) {
      return value;
    }

    const type = (value.type as string)?.toUpperCase();
    const schema = validReportSchema[type];

    if (!schema) {
      throw new BadRequestException(`Unsupported report type: "${value.type}"`);
    }

    validateFilters(value.filters, schema);

    return value;
  }
}

const validReportSchema = {
  INVENTORY: {
    productId: 'string',
    location: 'string',
    quantity: 'number',
    reorderTreshould: 'number',
    supplierId: 'string',
    lastUpdated: 'Date',
  },

  PRODUCT: {
    sku: 'string',
    brand: 'string',
    category: 'string',
    price: 'number',
    stockControlled: 'boolean',
    createdAt: 'Date',
    updatedAt: 'Date',
  },

  ORDER: {
    userId: 'string',
    subtotal: 'number',
    tax: 'number',
    shippingFee: 'number',
    total: 'number',
    status: 'string',
    placedAt: 'Date',
    updatedAt: 'Date',
  },
};

const validateFilters = (filters: Filter[], schema: Record<string, string>) => {
  const errors: string[] = [];
  const unknownField = 'unknown';

  for (const filter of filters) {
    const fieldType = schema[filter.field] || unknownField;

    if (fieldType === unknownField) {
      errors.push(`Unsupported field '${filter.field}'`);
      continue;
    }

    switch (fieldType) {
      case 'string':
        if (![FilterTypeEnum.EQ, FilterTypeEnum.LIKE].includes(filter.type)) {
          errors.push(
            `'${filter.type}' is not supported on string field '${filter.field}'`,
          );
        }
        break;

      case 'number':
      case 'Date':
        if (![FilterTypeEnum.RANGE].includes(filter.type)) {
          errors.push(
            `'${filter.type}' is not supported on ${fieldType} field '${filter.field}'`,
          );
        }
        break;

      case 'boolean':
        if (filter.type !== FilterTypeEnum.EQ) {
          errors.push(
            `Only 'EQ' filter is supported on boolean field '${filter.field}'`,
          );
        }
        break;

      default:
        errors.push(
          `Unsupported field type '${fieldType}' for field '${filter.field}'`,
        );
        break;
    }
  }

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }

  return true;
};
