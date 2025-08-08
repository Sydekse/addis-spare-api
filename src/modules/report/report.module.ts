import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportTypeOrmEntity } from './infrastructure/persistence/typeorm/report-typeorm.entity';
import { ReportController } from './interfaces/http/controllers/report.controller';
import { CreateReportUseCase } from './application/use-cases/create/create-report.use-case';
import { REPORT_REPOSITORY } from './domain/repositories/report.repository';
import { ReportTypeOrmRepository } from './infrastructure/persistence/repositories/report-typeorm.repository';
import { AllReportsUseCase } from './application/use-cases/find/all-reports.use-case';
import { FindReportByIdUseCase } from './application/use-cases/find/find-report-by-id.use-case';
import { UpdateReportUseCase } from './application/use-cases/update/update-report.use-case';
import { DeleteReportUseCase } from './application/use-cases/delete/delete-report.use-case';
import { UserModule } from '../users/user.module';
import { GenerateReportUseCase } from './application/use-cases/find/generate-report.use-case';
import { ProductModule } from '../product/product.module';
import { InventoryModule } from '../inventory/inventory.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportTypeOrmEntity]),
    UserModule,
    ProductModule,
    InventoryModule,
    OrderModule,
  ],
  controllers: [ReportController],
  providers: [
    CreateReportUseCase,
    AllReportsUseCase,
    FindReportByIdUseCase,
    GenerateReportUseCase,
    UpdateReportUseCase,
    DeleteReportUseCase,
    {
      provide: REPORT_REPOSITORY,
      useClass: ReportTypeOrmRepository,
    },
  ],
  exports: [REPORT_REPOSITORY],
})
export class ReportModule {}
