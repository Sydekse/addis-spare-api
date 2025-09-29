import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CartItem } from '../../domain/entities/cart-item.entity';

export class CreateCartDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  sessionId: string;

  @ValidateNested({ each: true })
  @Type(() => CartItem)
  items: CartItem[];
}
