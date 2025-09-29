import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  REPORT_REPOSITORY,
  ReportRepository,
} from 'src/modules/report/domain/repositories/report.repository';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';
import { Product } from 'src/modules/product/domain/entities/product.entity';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import { ReportTypeEnum } from '../../dto/create-report.dto';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';

@Injectable()
export class GenerateReportUseCase {
  constructor(
    @Inject(REPORT_REPOSITORY)
    private readonly reportRepository: ReportRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: string): Promise<Product[] | Order[] | Inventory[]> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }

    if (report.getType() === ReportTypeEnum.PRODUCT) {
      return this.productRepository.filterProduct(report.getParameters());
    }

    if (report.getType() === ReportTypeEnum.ORDER) {
      return this.orderRepository.filterOrder(report.getParameters());
    }

    if (report.getType() === ReportTypeEnum.INVENTORY) {
      return this.inventoryRepository.filterInventory(report.getParameters());
    }

    return [];
  }
}
