import { Repository } from 'typeorm';
import {
  Filter,
  FilterTypeEnum,
} from 'src/modules/report/application/dto/create-report.dto';
import { ProductTypeOrmEntity } from 'src/modules/product/infrastructure/persistence/typeorm/product-typeorm.entity';
import { OrderTypeOrmEntity } from 'src/modules/order/infrastructure/persistence/typeorm/order-typeorm.entity';
import { InventoryTypeOrmEntity } from 'src/modules/inventory/infrastructure/persistence/typeorm/inventory-typeorm.entity';

export abstract class Filterable {
  protected applyFilters(
    qb: ReturnType<
      Repository<
        ProductTypeOrmEntity | InventoryTypeOrmEntity | OrderTypeOrmEntity
      >['createQueryBuilder']
    >,
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
          throw new Error(`Unsupported filter type: ${filter.type || ""}`);
      }
    });
  }
}
