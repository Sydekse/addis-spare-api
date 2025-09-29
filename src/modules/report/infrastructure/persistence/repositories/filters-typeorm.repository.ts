import {
  Filter,
  FilterTypeEnum,
} from 'src/modules/report/application/dto/create-report.dto';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export abstract class Filterable {
  protected applyFilters<Entity extends ObjectLiteral>(
    qb: SelectQueryBuilder<Entity>,
    alias: string,
    filters: Filter[],
    schema: Record<string, string>,
  ): void {
    filters.forEach((filter, index) => {
      const paramKey = `${filter.field}_${index}`;
      const fieldPath = `${alias}.${filter.field}`;
      const fieldType = schema[filter.field];

      switch (filter.type) {
        case FilterTypeEnum.EQ:
          qb.andWhere(`${fieldPath} = :${paramKey}`, { [paramKey]: filter.eq });
          break;

        case FilterTypeEnum.LIKE:
          qb.andWhere(`${fieldPath} ILIKE :${paramKey}`, {
            [paramKey]: `%${filter.like}%`,
          });
          break;

        case FilterTypeEnum.RANGE:
          if (fieldType === 'Date') {
            qb.andWhere(
              `${fieldPath} BETWEEN :${paramKey}_min AND :${paramKey}_max`,
              {
                [`${paramKey}_min`]: new Date(filter.range?.min),
                [`${paramKey}_max`]: new Date(filter.range?.max),
              },
            );
          } else {
            qb.andWhere(
              `${fieldPath} BETWEEN :${paramKey}_min AND :${paramKey}_max`,
              {
                [`${paramKey}_min`]: filter.range?.min,
                [`${paramKey}_max`]: filter.range?.max,
              },
            );
          }
          break;

        default:
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          throw new Error(`Unsupported filter type: ${filter.type || ''}`);
      }
    });
  }
}
