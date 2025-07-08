import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { CreateOrderDto } from 'src/modules/order/application/dto/create-order.dto';
import { FindAllOrdersUseCase } from 'src/modules/order/application/use-cases/create-module/all-orders.use-case';
import { CancelOrderUseCase } from 'src/modules/order/application/use-cases/create-module/cancel-order.use-case';
import { PlaceOrderUseCase } from 'src/modules/order/application/use-cases/create-module/create-order.use-case';
import { DeleteOrderUseCase } from 'src/modules/order/application/use-cases/create-module/delete-order.use-case';
import { FindOrderByUserIdUseCase } from 'src/modules/order/application/use-cases/create-module/find-order-by-user-id.use-case';
import { FindOrderByIdUseCase } from 'src/modules/order/application/use-cases/create-module/find-order.use-case';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('orders')
@UseGuards(JwtAuthGuard, ACGuard)
export class OrderController {
  constructor(
    private readonly placeOrderUseCase: PlaceOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly findOrdersByUserIdUseCase: FindOrderByUserIdUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @UseRoles({
    resource: 'order',
    action: 'create',
    possession: 'own',
  })
  async create(@Req() req, @Body() dto: CreateOrderDto): Promise<Order> {
    const userId = req.user.id || uuidv4();
    return this.placeOrderUseCase.execute(userId, dto);
  }

  @Get('byUser/:id')
  @UseRoles({
    resource: 'order',
    action: 'read',
    possession: 'own',
  })
  async findOrderByUserId(@Param('id') id: string): Promise<Order[]> {
    return this.findOrdersByUserIdUseCase.execute(id);
  }

  @Put(':id/cancel')
  @UseRoles({
    resource: 'order',
    action: 'update',
    possession: 'own',
  })
  async cancel(@Param('id') id: string): Promise<Order | null> {
    return this.cancelOrderUseCase.execute(id);
  }

  @Get(':id')
  @UseRoles({
    resource: 'order',
    action: 'read',
    possession: 'own',
  })
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.findOrderByIdUseCase.execute(id);
  }

  @Get()
  @UseRoles({
    resource: 'order',
    action: 'read',
    possession: 'any',
  })
  async findAll(): Promise<Order[]> {
    return this.findAllOrdersUseCase.execute();
  }

  @Delete(':id')
  @UseRoles({
    resource: 'invetory',
    action: 'delete',
    possession: 'any',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteOrderUseCase.execute(id);
  }
}
