import { Filter } from 'src/modules/report/application/dto/create-report.dto';
import { Product } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol.for('ProductRepository');

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findProdutByFilters(filters: Record<string, string>): Promise<Product[]>;
  findCompatibleProducts(compatable: {
    make: string;
    model: string;
    year: number;
    useOr: boolean;
  }): Promise<Product[]>;
  findBySKU(sku: string): Promise<Product | null>;
  search(query: string): Promise<Product[]>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  filterProduct(filters: Filter[]): Promise<Product[]>;
}
