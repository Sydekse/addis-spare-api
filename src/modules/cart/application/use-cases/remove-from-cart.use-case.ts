import { Inject, Injectable } from "@nestjs/common";
import { CART_REPOSITORY, CartRepository } from "../../domain/repositories/cart.repository";
import { RemoveFromCartDto } from "../dto/remove-from-cart.dto";

@Injectable()
export class RemoveFromCartUseCase {
    constructor(
        @Inject(CART_REPOSITORY)
        private readonly cartRepository: CartRepository,
    ) {}

    async execute(removeFromCart : RemoveFromCartDto): Promise<void> {
        await this.cartRepository.removeFromCart(removeFromCart.cartID, removeFromCart.itemID);
    }
}