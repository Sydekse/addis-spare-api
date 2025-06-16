import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './interfaces/http/controllers/module.controller';
import { CreateModuleUseCase } from './application/use-cases/create-module/create-module.use-case';
import { ModuleTypeOrmEntity } from './infrastructure/persistence/typeorm/module-typeorm.entity';
import { ModuleTypeOrmRepository } from './infrastructure/persistence/repositories/module-typeorm.repository';
import { MODULE_REPOSITORY } from './domain/repositories/module.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleTypeOrmEntity])],
  controllers: [ModuleController],
  providers: [
    CreateModuleUseCase,
    {
      provide: MODULE_REPOSITORY,
      useClass: ModuleTypeOrmRepository,
    },
  ],
  exports: [MODULE_REPOSITORY],
})
export class ModuleModule {}
