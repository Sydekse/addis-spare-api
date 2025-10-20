import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY,
  CartRepository,
} from '../../domain/repositories/cart.repository';
import { FindCartByIdDto, FindCartByUserDto } from '../dto/find-cart.dto';

@Injectable()
class FindCartByIdUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}
  async execute(cartId: FindCartByIdDto) {
    const cart = await this.cartRepository.findById(cartId.id);
    if (!cart) {
      throw new Error(`Cart with ID ${cartId.id} not found`);
    }
    return cart;
  }
}

class FindCartByUserIdUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}
  async execute(userId: FindCartByUserDto) {
    const cart = await this.cartRepository.findByUserId(userId.userId);
    if (!cart) {
      throw new Error(`Cart for user ID ${userId.userId} not found`);
    }
    return cart;
  }
}

export { FindCartByIdUseCase, FindCartByUserIdUseCase };
