import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY,
  CartRepository,
} from '../../domain/repositories/cart.repository';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { AddToCartDto } from '../dto/add-to-cart.dto';

@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(cartItem: AddToCartDto): Promise<void> {
    const cartItemEntiry = CartItem.create(
      cartItem.item.getProductId(),
      cartItem.item.getQuantity(),
      cartItem.item.getPrice(),
      cartItem.item.getCompatibilityNote(),
    );

    await this.cartRepository.addToCart(cartItem.id, cartItemEntiry);
  }
}
