import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  CART_REPOSITORY,
  CartRepository,
} from '../../domain/repositories/cart.repository';
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

    if (cart.getUserId() !== userId) {
      throw new NotFoundException(
        `Cart with ID ${cartId} not found for user ${userId}`,
      );
    }

    // TODO: make sure to add redirection for creating an order
  }
}
