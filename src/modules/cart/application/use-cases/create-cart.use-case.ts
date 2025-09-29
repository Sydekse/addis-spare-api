import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY,
  CartRepository,
} from '../../domain/repositories/cart.repository';
import { CreateCartDto } from '../dto/create-cart.dto';
import { Cart } from '../../domain/entities/cart.entity';

@Injectable()
export class CreateCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository, // Replace 'any' with the actual type of your cart repository
  ) {}
  async execute(createCartDto: CreateCartDto): Promise<void> {
    const cart = Cart.create(
      createCartDto.id,
      createCartDto.userId,
      createCartDto.sessionId,
      [],
      null,
      0,
      new Date(),
      new Date(),
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    );

    await this.cartRepository.save(cart);
  }
}
