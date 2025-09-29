import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isBoolean } from 'class-validator';
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

const invalidDate = (text: string) => {
  const date = Date.parse(text);
  return isNaN(date);
};

const isNumber = (value: any): boolean => {
  return (
    typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
  );
};

function validRange<T>(n1: T, n2: T): boolean {
  if (typeof n1 !== typeof n2) {
    throw new Error(`Type mismatch: '${typeof n1}' vs '${typeof n2}'`);
  }

  if (typeof n1 === 'number' || typeof n1 === 'string') {
    return n1 <= n2;
  }

  if (n1 instanceof Date && n2 instanceof Date) {
    return n1.getTime() <= n2.getTime();
  }

  throw new Error(`Unsupported type for range comparison: ${typeof n1}`);
}

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
        {
          if (![FilterTypeEnum.RANGE].includes(filter.type)) {
            errors.push(
              `'${filter.type}' is not supported on ${fieldType} field '${filter.field}'`,
            );
            break;
          }

          if (!isNumber(filter?.range?.max) || !isNumber(filter?.range?.min)) {
            errors.push(
              `expecting 'range.max' and 'range.min' to be number on a numeric field '${filter.field}'`,
            );
            break;
          }

          if (!validRange<number>(filter.range?.min, filter.range?.max)) {
            errors.push(
              `expecting 'range.max' to be greater than or equal to 'range.min' on a numeric field '${filter.field}'`,
            );
          }
        }
        break;
      case 'Date':
        {
          if (![FilterTypeEnum.RANGE].includes(filter.type)) {
            errors.push(
              `'${filter.type}' is not supported on ${fieldType} field '${filter.field}'`,
            );
            break;
          }

          if (
            invalidDate(filter?.range?.max || '') ||
            invalidDate(filter?.range?.min)
          ) {
            errors.push(
              `expecting 'range.max' and 'range.min' to be date on a date field '${filter.field}'`,
            );
          }

          if (
            !validRange<Date>(
              new Date(filter.range?.min),
              new Date(filter.range?.max),
            )
          ) {
            errors.push(
              `expecting 'range.max' to be greater than or equal to 'range.min' on a date field '${filter.field}'`,
            );
          }
        }
        break;

      case 'boolean':
        {
          if (filter.type !== FilterTypeEnum.EQ) {
            errors.push(
              `Only 'EQ' filter is supported on boolean field '${filter.field}'`,
            );
            break;
          }

          if (!isBoolean(filter.eq)) {
            errors.push(
              `expecting 'eq' to be boolean on a boolean field '${filter.field}'`,
            );
          }
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
