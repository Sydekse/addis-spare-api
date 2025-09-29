import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AddToCartDto } from 'src/modules/cart/application/dto/add-to-cart.dto';
import { CreateCartDto } from 'src/modules/cart/application/dto/create-cart.dto';
import {
  FindCartByIdDto,
  FindCartByUserDto,
} from 'src/modules/cart/application/dto/find-cart.dto';
import { RemoveFromCartDto } from 'src/modules/cart/application/dto/remove-from-cart.dto';
import { AddToCartUseCase } from 'src/modules/cart/application/use-cases/add-to-cart.use-case';
import { CreateCartUseCase } from 'src/modules/cart/application/use-cases/create-cart.use-case';
import {
  FindCartByIdUseCase,
  FindCartByUserIdUseCase,
} from 'src/modules/cart/application/use-cases/find-cart.use-case';
import { RemoveFromCartUseCase } from 'src/modules/cart/application/use-cases/remove-from-cart.use-case';

@Controller('cart')
export class CartController {
  constructor(
    private readonly addToCartUseCase: AddToCartUseCase, // Replace with actual use case
    private readonly removeFromCartUseCase: RemoveFromCartUseCase, // Replace with actual use case
    private readonly findCartByIdUseCase: FindCartByIdUseCase, // Replace with actual use case
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase, // Replace with actual use case
    private readonly saveCartUseCase: CreateCartUseCase, // Replace with actual use case
  ) {}

  @Post('add')
  async addToCart(
    @Param('id') cartID: string,
    @Body() cartItem: AddToCartDto,
  ): Promise<void> {
    cartItem.id = cartID; // Ensure the cart ID is set in the DTO
    return await this.addToCartUseCase.execute(cartItem);
  }
  @Delete('remove')
  async removeFromCart(
    @Body() removeFromCart: RemoveFromCartDto,
  ): Promise<void> {
    return await this.removeFromCartUseCase.execute(removeFromCart);
  }
  @Get(':id')
  async findCartById(@Param('id') cartId: FindCartByIdDto): Promise<any> {
    return await this.findCartByIdUseCase.execute(cartId);
  }

  @Get('user/:userId')
  async findCartByUserId(
    @Param('userId') userId: FindCartByUserDto,
  ): Promise<any> {
    return await this.findCartByUserIdUseCase.execute(userId);
  }

  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto): Promise<void> {
    return await this.saveCartUseCase.execute(createCartDto);
  }
}
