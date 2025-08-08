import { Injectable } from '@nestjs/common';
import currencyCodes from 'currency-codes';

@Injectable()
export class ValidateCurrencyUseCase {
  constructor() {}
  execute(currency: string) {
    const code = currency.trim().toUpperCase();
    const result = currencyCodes.code(code);
    return !!result;
  }
}
