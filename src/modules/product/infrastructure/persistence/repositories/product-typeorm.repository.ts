import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductTypeOrmEntity } from '../typeorm/product-typeorm.entity';
import { FilterProductHelper } from 'src/modules/product/application/helper/filter-products.helper';
import { Filter } from 'src/modules/report/application/dto/create-report.dto';
import { Filterable } from 'src/modules/report/infrastructure/persistence/repositories/filters-typeorm.repository';

@Injectable()
export class ProductTypeOrmRepository
  extends Filterable
  implements ProductRepository
{
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly repository: Repository<ProductTypeOrmEntity>,
  ) {
    super();
  }
  async findCompatibleProducts(compatible: {
    make: string;
    model: string;
    year: number;
    useOr: boolean;
  }): Promise<Product[]> {
    const { make, model, year, useOr } = compatible;
    const qb = this.repository.createQueryBuilder('product');

    const conditions: string[] = [];
    const params: Record<string, any> = {};

    if (make) {
      conditions.push(`comp->>'make' = :make`);
      params.make = make;
    }

    if (model) {
      conditions.push(`comp->>'model' = :model`);
      params.model = model;
    }

    if (year !== -1) {
      // it is not possible to have -ve year
      conditions.push(`comp->>'year' = :year`);
      params.year = year.toString();
    }

    let joiner = ' AND ';
    if (useOr) {
      console.log('here');
      joiner = ' OR ';
    }
    const whereClause = `EXISTS (
    SELECT 1 FROM jsonb_array_elements(product.compatibility) AS comp
    WHERE ${conditions.join(joiner)}
  )`;

    qb.where(whereClause, params);

    const products = await qb.getMany();

    return products.map(
      (entity) =>
        new Product(
          entity.id,
          entity.name,
          entity.description,
          entity.sku,
          entity.brand,
          entity.category,
          entity.price,
          entity.images,
          entity.attributes,
          entity.tags,
          entity.stockControlled,
          entity.compatibility,
        ),
    );
  }

  async filterProduct(filters: Filter[]): Promise<Product[]> {
    const alias = 'product';

    const schema = {
      sku: 'string',
      brand: 'string',
      category: 'string',
      price: 'number',
      stockControlled: 'boolean',
      createdAt: 'Date',
      updatedAt: 'Date',
    };

    const qb = this.repository.createQueryBuilder(alias);
    this.applyFilters(qb, alias, filters, schema);
    const products = await qb.getMany();

    return products.map(
      (entity) =>
        new Product(
          entity.id,
          entity.name,
          entity.description,
          entity.sku,
          entity.brand,
          entity.category,
          entity.price,
          entity.images,
          entity.attributes,
          entity.tags,
          entity.stockControlled,
          entity.compatibility,
        ),
    );
  }

  async findProdutByFilters(
    filters: Record<string, string>,
  ): Promise<Product[]> {
    const where = FilterProductHelper.parseFilters(filters);
    const { limit, offset } = FilterProductHelper.parsePagination(filters);
    const sortBy = FilterProductHelper.parseSortingField(filters);

    const entities = await this.repository.find({
      where,
      skip: offset,
      take: limit,
      order: sortBy,
    });

    return entities.map(
      (entity) =>
        new Product(
          entity.id,
          entity.name,
          entity.description,
          entity.sku,
          entity.brand,
          entity.category,
          entity.price,
          entity.images,
          entity.attributes,
          entity.tags,
          entity.stockControlled,
          entity.compatibility,
        ),
    );
  }

  async findBySKU(sku: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { sku } });
    if (!entity) return null;
    return new Product(
      entity.id,
      entity.name,
      entity.description,
      entity.sku,
      entity.brand,
      entity.category,
      entity.price,
      entity.images,
      entity.attributes,
      entity.tags,
      entity.stockControlled,
      entity.compatibility,
    );
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new Product(
      entity.id,
      entity.name,
      entity.description,
      entity.sku,
      entity.brand,
      entity.category,
      entity.price,
      entity.images,
      entity.attributes,
      entity.tags,
      entity.stockControlled,
      entity.compatibility,
    );
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Product(
          entity.id,
          entity.name,
          entity.description,
          entity.sku,
          entity.brand,
          entity.category,
          entity.price,
          entity.images,
          entity.attributes,
          entity.tags,
          entity.stockControlled,
          entity.compatibility,
        ),
    );
  }

  async save(product: Product): Promise<void> {
    const entity = new ProductTypeOrmEntity();
    entity.id = product.getId();
    entity.name = product.getName();
    entity.description = product.getDescription();
    entity.sku = product.getSku();
    entity.brand = product.getBrand();
    entity.category = product.getCategory();
    entity.price = product.getPrice();
    entity.images = product.getImages();
    entity.attributes = product.getAttributes();
    entity.tags = product.getTags();
    entity.stockControlled = product.getStockControlled();
    entity.compatibility = product.getCompatibility();
    entity.createdAt = product.getCreatedAt();
    entity.updatedAt = product.getUpdatedAt();

    await this.repository.save(entity);
  }

  async search(query: string): Promise<Product[]> {
    const entities = await this.repository
      .createQueryBuilder('product')
      .where(`product.search_vector @@ plainto_tsquery('english', :query)`, {
        query,
      })
      .orderBy(
        `ts_rank(product.search_vector, plainto_tsquery('english', '${query}'))`,
        'DESC',
      )
      .getMany();

    return entities.map(
      (entity) =>
        new Product(
          entity.id,
          entity.name,
          entity.description,
          entity.sku,
          entity.brand,
          entity.category,
          entity.price,
          entity.images,
          entity.attributes,
          entity.tags,
          entity.stockControlled,
          entity.compatibility,
        ),
    );
  }

  async update(product: Product): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: product.getId() },
    });
    if (!entity) throw new Error('Product not found');

    entity.name = product.getName();
    entity.description = product.getDescription();
    entity.sku = product.getSku();
    entity.brand = product.getBrand();
    entity.category = product.getCategory();
    entity.price = product.getPrice();
    entity.images = product.getImages();
    entity.attributes = product.getAttributes();
    entity.tags = product.getTags();
    entity.stockControlled = product.getStockControlled();
    entity.createdAt = product.getCreatedAt();
    entity.updatedAt = product.getUpdatedAt();
    entity.compatibility = product.getCompatibility();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
