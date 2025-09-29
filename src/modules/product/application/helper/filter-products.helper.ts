import {
  FindOperator,
  Like,
  Not,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Raw,
} from 'typeorm';

export type TypeORMComparison = FindOperator<any>;

export class FilterProductHelper {
  private static allowedFields: string[] = [
    'sku',
    'brand',
    'category',
    'price',
    'stockControlled',
    'createdAt',
    'tags',
    'use-or',
  ];

  private static requiresCast = ['createdAt'];

  private static castMapping: Record<string, any> = {
    createdAt: (value: string) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${value}`);
      }

      return date;
    },
  };

  private static validOperators: Record<string, string[]> = {
    sku: ['eq', 'like'],
    brand: ['like'],
    category: ['like'],
    price: ['eq', 'gt', 'gte', 'lt', 'lte', 'ne'],
    stockControlled: ['eq', 'ne'],
    tags: ['contains'],
    createdAt: ['gt', 'gte', 'lt', 'lte'],
  };

  static parseFilters(
    query: Record<string, string>,
  ): Record<string, TypeORMComparison> | Record<string, TypeORMComparison>[] {
    const filters: Record<string, TypeORMComparison> = {};
    let useOr: boolean = false;
    for (const key in query) {
      if (key == 'use-or') {
        useOr = true;
        continue;
      }

      const [field, operator] = key.split(':');
      if (!this.allowedFields.includes(field)) {
        continue;
      }

      let value: any = query[key];
      if (!this.validOperators[field].includes(operator) || !value) {
        continue;
      }

      if (this.requiresCast.includes(field)) {
        value = this.castMapping[field](value);
      }

      switch (operator) {
        case 'eq':
          filters[field] = value;
          break;
        case 'has':
          filters[field] = Raw((alias) => `:tag = ANY(${alias})`, {
            tag: value,
          });
          break;
        case 'ne':
          filters[field] = Not(value);
          break;
        case 'gt':
          filters[field] = MoreThan(value);
          break;
        case 'gte':
          filters[field] = MoreThanOrEqual(value);
          break;
        case 'lt':
          filters[field] = LessThan(value);
          break;
        case 'lte':
          filters[field] = LessThanOrEqual(value);
          break;
        case 'like':
          filters[field] = Like(`%${value}%`);
          break;
        default:
          // fallback or throw error for unsupported operator
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }

    if (useOr) {
      const orFilters: Record<string, TypeORMComparison>[] = [];
      for (const filterKey in filters) {
        orFilters.push({ [filterKey]: filters[filterKey] });
      }
      return orFilters;
    }

    return filters;
  }

  static parsePagination(query: Record<string, string>): {
    offset: number;
    limit: number;
  } {
    const DEFAULT_PAGE = 0;
    const DEFAULT_LIMIT = 100;

    const strPage = query['page'] ?? '';
    const strLimit = query['limit'] ?? '';

    let page = parseInt(strPage, 10);
    let limit = parseInt(strLimit, 10);

    if (isNaN(page) || page < 0) {
      page = DEFAULT_PAGE;
    }

    if (isNaN(limit) || limit <= 0) {
      limit = DEFAULT_LIMIT;
    }

    const offset = Math.max(0, (page - 1) * limit);

    return { offset, limit };
  }

  private static sortingOptions: string[] = ['DESC', 'ASC'];
  private static sortingAllowedFields: string[] = [
    'name',
    'sku',
    'brand',
    'category',
    'price',
  ];

  static parseSortingField(
    query: Record<string, string>,
  ): Record<string, string> {
    // sort:field='ASC'|'DESC'
    const defaultSortingOps = { createdAt: 'DESC' };

    for (const key in query) {
      if (!key.startsWith('sort')) {
        continue;
      }

      const value = query[key];

      const [command, field] = key.split(':');
      if (
        command !== 'sort' ||
        !this.sortingAllowedFields.includes(field) ||
        !this.sortingOptions.includes(value)
      ) {
        continue;
      }

      return { [field]: value };
    }

    return defaultSortingOps;
  }
}
