import { Type } from "class-transformer";
import { IsUUID, IsString, IsInt, Min, IsNumber, IsArray, ArrayMinSize, ValidateNested, IsOptional, IsEnum } from "class-validator";

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class OrderItemDto {
  @IsUUID()
  productId: string;

  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unitPrice: number;
}

export class OrderDiscountDto {
  @IsString()
  code: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;
}

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  shippingFee: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDiscountDto)
  discounts?: OrderDiscountDto[];

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
