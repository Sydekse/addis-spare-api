import { IsNotEmpty } from 'class-validator';

export class RemoveFromCartDto {
  @IsNotEmpty()
  cartID: string;

  @IsNotEmpty()
  itemID: string;
}
