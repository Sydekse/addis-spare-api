import { Injectable, Inject } from '@nestjs/common';
import {
  CART_REPOSITORY,
  CartRepository,
} from '../../domain/repositories/cart.repository';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';

@Injectable()
export class CheckoutUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(cartId: string, userId: string) {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    // Optionally check for expiry, because we already remove expired carts in a scheduled job
    if (cart.getExpiresAt() < new Date()) throw new Error('Cart expired');

    const order = new Order(cart.getId(), userId, cart.getItems(), new Date());
    await this.orderRepo.save(order);
    // Clear cart items
    cart.clearItems();
    await this.cartRepo.save(cart);
    return order;
  }
}
