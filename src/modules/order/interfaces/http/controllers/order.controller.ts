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
import { CreateOrderDto } from 'src/modules/order/application/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/order/application/dto/update-order.dto';
import { FindAllOrdersUseCase } from 'src/modules/order/application/use-cases/create-module/all-orders.use-case';
import { PlaceOrderUseCase } from 'src/modules/order/application/use-cases/create-module/create-order.use-case';
import { DeleteOrderUseCase } from 'src/modules/order/application/use-cases/create-module/delete-order.use-case';
import { FindOrderByIdUseCase } from 'src/modules/order/application/use-cases/create-module/find-order.use-case';
import { UpdateOrderUseCase } from 'src/modules/order/application/use-cases/create-module/update-order.use-case';
import { Order } from 'src/modules/order/domain/entities/order.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard, ACGuard)
export class OrderController {
  constructor(
    private readonly placeOrderUseCase : PlaceOrderUseCase,
    private readonly findAllOrdersUseCase : FindAllOrdersUseCase,
    // private readonly findOrdersByUserIdUseCase : FindOrdersByUserIdUseCase,
    private readonly findOrderByIdUseCase : FindOrderByIdUseCase,
    private readonly updateOrderUseCase : UpdateOrderUseCase,
    private readonly deleteOrderUseCase : DeleteOrderUseCase
  ) {}

  @Post()
  @UseRoles({
    resource: "order",
    action: "create",
    possession: "own"
  })
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.placeOrderUseCase.execute(dto);
  }

  @Get(':id')
  @UseRoles({
    resource: "order",
    action: "read",
    possession: "own"
  })
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.findOrderByIdUseCase.execute(id);
  }

  @Get()
  @UseRoles({
    resource: "order",
    action: "read",
    possession: "any"
  })
  async findAll(): Promise<Order[]> {
    return this.findAllOrdersUseCase.execute();
  }

  @Put(':id')
  @UseRoles({
    resource: "order",
    action: "update",
    possession: "own"
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<Order> {
    return this.updateOrderUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseRoles({
    resource: "invetory",
    action: "delete",
    possession: "any"
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteOrderUseCase.execute(id);
  }
}
