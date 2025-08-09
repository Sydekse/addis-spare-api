import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CartItem } from '../../domain/entities/cart-item.entity';

export class AddToCartDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  id: string;

  @ValidateNested()
  @Type(() => CartItem)
  item: CartItem;
}
