import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartTypeOrmEntity } from "./infrastructure/typeorm/cart-typeorm.entity";
import { CartController } from "./interface/http/controller/cart.controller";
import { CreateCartUseCase } from "./application/use-cases/create-cart.use-case";
import { AddToCartUseCase } from "./application/use-cases/add-to-cart.use-case";
import { RemoveFromCartUseCase } from "./application/use-cases/remove-from-cart.use-case";
import { FindCartByIdUseCase } from "./application/use-cases/find-cart.use-case";
import { CART_REPOSITORY } from "./domain/repositories/cart.repository";
import { CartTypeOrmRepository } from "./infrastructure/repositories/cart-typeorm.repository";

@Module({
    imports: [ TypeOrmModule.forFeature([CartTypeOrmEntity]) ], 
    controllers: [ CartController ],
    providers: [
        CreateCartUseCase, 
        AddToCartUseCase, 
        RemoveFromCartUseCase, 
        FindCartByIdUseCase,
        {
            provide: 'CART_REPOSITORY',
            useClass: CartTypeOrmRepository, 
        }
    ],
    exports: [CART_REPOSITORY],
})

export class CartModule {}