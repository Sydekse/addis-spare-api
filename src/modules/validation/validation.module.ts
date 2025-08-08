import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../users/user.module';
import { ValidateCurrencyUseCase } from './application/use-cases/validate-currency.use-case';
import { ValidateEmailUseCase } from './application/use-cases/validate-email.use-case';
import { VAlidateSkuUseCase } from './application/use-cases/validate-sku.use-case';

@Module({
  imports: [ProductModule, UserModule],
  providers: [
    ValidateCurrencyUseCase,
    ValidateEmailUseCase,
    VAlidateSkuUseCase,
  ],
  exports: [ValidateCurrencyUseCase, ValidateEmailUseCase, VAlidateSkuUseCase],
})
export class ValidationModule {}
