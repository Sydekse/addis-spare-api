import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
export const CART_REPOSITORY = Symbol.for('CartRepository');
export interface CartRepository {
  findById(id: string): Promise<Cart | null>;
  findByUserId(cartID: string): Promise<Cart | null>;
  addToCart(cartID: string, cart: CartItem): Promise<void>;
  removeFromCart(cartID: string, itemID: string): Promise<void>;
  save(cart: Cart): Promise<void>;
  findExpiredCarts(expiryDate: Date): Promise<Cart[]>;
  removeCart(cartID: string): Promise<void>;
}
