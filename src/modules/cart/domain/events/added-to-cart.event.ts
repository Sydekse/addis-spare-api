import { Cart } from '../entities/cart.entity';

export class AddedToCartEvent {
  constructor(public cart: Cart) {}
}
