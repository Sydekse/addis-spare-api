import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrmEntity } from "src/modules/users/infrastructure/typeorm/user-typeorm.entity";
import { Repository } from "typeorm";
import { Cart } from "src/modules/cart/domain/entities/cart.entity";
import { CartTypeOrmEntity } from "../typeorm/cart-typeorm.entity";
import { CartItem } from "../../domain/entities/cart-item.entity";

@Injectable()

export class CartTypeOrmRepository {

    constructor(
        @InjectRepository(CartTypeOrmEntity)
        private readonly repository: Repository<CartTypeOrmEntity>,
    ) {}

    async findById(id: string): Promise<Cart | null> {
        const cart = await this.repository.findOne({ where: { id } });
        if (!cart) return null;
        return  new Cart(
            cart.id,
            cart.userId,
            cart.sessionId,
            cart.items ?? [],
            cart.couponCode,
            cart.discountAmount,
            cart.createdAt,
            cart.updatedAt,
            cart.expiresAt
        )
        
    }

    async findByUserId(userId: string): Promise<Cart | null> {
        const cart = await this.repository.findOne({ where: { userId } });
        if (!cart) return null;
        return new Cart(
            cart.id,
            cart.userId,
            cart.sessionId,
            cart.items ?? [],
            cart.couponCode,
            cart.discountAmount,
            cart.createdAt,
            cart.updatedAt,
            cart.expiresAt
        );
    }

    async addToCart(cartID: string, item: CartItem): Promise<void> {
        const cart = await this.repository.findOne({ where: { id: cartID } });
        if (!cart) {
            throw new Error(`Cart with ID ${cartID} not found`);
        }



        cart.items = [...(cart.items ?? []), item];
        await this.repository.save(cart);
    }

    async removeFromCart(cartID: string, itemID: string): Promise<void> {
        const cart = await this.repository.findOne({ where: { id: cartID } });
        if (!cart) {
            throw new Error(`Cart with ID ${cartID} not found`);
        }

        cart.items = (cart.items ?? []).filter((cartItem) => cartItem.id !== itemID);
        await this.repository.save(cart);
    }

    async save(cart: Cart): Promise<void> {
        const cartEntity = new CartTypeOrmEntity();
        cartEntity.id = cart.getId();
        cartEntity.userId = cart.getUserId();
        cartEntity.sessionId = cart.getSessionId();
        cartEntity.items = cart.getItems();
        cartEntity.couponCode = cart.getCouponCode();
        cartEntity.discountAmount = cart.getDiscountAmount();
        cartEntity.createdAt = cart.getCreatedAt();
        cartEntity.updatedAt = cart.getUpdatedAt();
        cartEntity.expiresAt = cart.getExpiresAt();

        await this.repository.save(cartEntity);
    }
    
}