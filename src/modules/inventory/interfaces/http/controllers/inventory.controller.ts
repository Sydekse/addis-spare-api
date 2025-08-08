import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { CreateInventoryDto } from 'src/modules/inventory/application/dto/create-inventory.dto';
import { UpdateInventoryDto } from 'src/modules/inventory/application/dto/update-inventory.dto';
import { FindAllInventoriesUseCase } from 'src/modules/inventory/application/use-cases/find/all-inventorys.use-case';
import { CreateInventoryUseCase } from 'src/modules/inventory/application/use-cases/create/create-inventory.use-case';
import { DeleteInventoryUseCase } from 'src/modules/inventory/application/use-cases/delete/delete-inventory.use-case';
import { FindInventoryByIdUseCase } from 'src/modules/inventory/application/use-cases/find/find-inventory.use-case';
import { UpdateInventoryUseCase } from 'src/modules/inventory/application/use-cases/update/update-inventory.use-case';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';

@Controller('inventories')
@UseGuards(JwtAuthGuard, ACGuard)
export class InventoryController {
  constructor(
    private readonly createInventoryUseCase: CreateInventoryUseCase,
    private readonly updateInventoryUseCase: UpdateInventoryUseCase,
    private readonly findInventoryByIdUseCase: FindInventoryByIdUseCase,
    private readonly findAllInventoriesUseCase: FindAllInventoriesUseCase,
    private readonly deleteInventoryUseCase: DeleteInventoryUseCase,
  ) {}

  @Post()
  @UseRoles({
    resource: 'inventory',
    action: 'create',
    possession: 'any',
  })
  async create(@Body() dto: CreateInventoryDto): Promise<Inventory> {
    return this.createInventoryUseCase.execute(dto);
  }

  @Get(':id')
  @UseRoles({
    resource: 'inventory',
    action: 'read',
    possession: 'any',
  })
  async findOne(@Param('id') id: string): Promise<Inventory | null> {
    return this.findInventoryByIdUseCase.execute(id);
  }

  @Get()
  @UseRoles({
    resource: 'inventory',
    action: 'read',
    possession: 'any',
  })
  async findAll(): Promise<Inventory[]> {
    return this.findAllInventoriesUseCase.execute();
  }

  @Put(':id')
  @UseRoles({
    resource: 'inventory',
    action: 'update',
    possession: 'any',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInventoryDto,
  ): Promise<Inventory> {
    return this.updateInventoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseRoles({
    resource: 'invetory',
    action: 'delete',
    possession: 'any',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteInventoryUseCase.execute(id);
  }
}
