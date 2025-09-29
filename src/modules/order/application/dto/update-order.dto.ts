import { IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from './create-order.dto';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
