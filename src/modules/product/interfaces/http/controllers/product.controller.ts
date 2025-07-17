import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Inject,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../../application/use-cases/create/create-product.use-case';
import { CreateProductDto } from '../../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../../application/dto/update-product.dto';
import { Product } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';
import { FilterProductsUseCase } from 'src/modules/product/application/use-cases/find/find-products.use-case';
import { UpdateProductUseCase } from 'src/modules/product/application/use-cases/update/update-product.use-case';
import { FilterCompatibleProductsUseCase } from 'src/modules/product/application/use-cases/find/filter-product-by-compatiblity.use-case';
import { DeleteProductUseCase } from 'src/modules/product/application/use-cases/delete/delete-product.use-case';

@Controller('products')
@UsePipes(new ValidationPipe())
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    private readonly filterProductsUseCase: FilterProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly filterProductsByCompatiblityUseCase: FilterCompatibleProductsUseCase,
  ) {}

  @Get('search')
  async search(@Query('q') query: string): Promise<Product[]> {
    return this.productRepository.search(query);
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.findBySKU(dto.sku);
    if (product) throw new BadRequestException('sku must be unique');
    return this.createProductUseCase.execute(dto);
  }

  @Get('compatible')
  async filterByCompatiblity(
    @Query()
    query: {
      make?: string;
      model?: string;
      year?: number;
      useOr?: string;
    },
  ): Promise<Product[]> {
    const qry = { ...query, useOr: query.useOr === 'true' };
    return this.filterProductsByCompatiblityUseCase.execute(qry);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw Error('product not found!');
    return product;
  }

  @Get()
  async findAll(@Query() query: Record<string, string>): Promise<Product[]> {
    return this.filterProductsUseCase.execute(query);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteProductUseCase.execute(id);
  }
}
