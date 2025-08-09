import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import {
  CART_REPOSITORY,
  CartRepository,
} from '../../domain/repositories/cart.repository';

@Injectable()
export class CartExpiryJob {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
  ) {}

  @Cron('0 0 * * *') // Runs daily at midnight
  async handleCartExpiry() {
    const now = new Date();
    // 30 days in ms
    const expiryDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    // You need to implement findExpiredCarts in your repository
    const expiredCarts = await this.cartRepo.findExpiredCarts(expiryDate);
    for (const cart of expiredCarts) {
      // You may want to mark as expired, archive, or delete
      await this.cartRepo.removeCart(cart.getId());
    }
  }
}
