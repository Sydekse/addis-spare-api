import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CartItem } from '../../domain/entities/cart-item.entity';

export class RemoveFromCartDto {
  @IsNotEmpty()
  cartID: string;

  @IsNotEmpty()
  itemID: string;
}
