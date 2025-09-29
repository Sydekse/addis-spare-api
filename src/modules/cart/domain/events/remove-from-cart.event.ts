import { Cart } from 'src/modules/cart/domain/entities/cart.entity';

export class RemoveFromCartEvent {
  constructor(public cart: Cart) {}
}
