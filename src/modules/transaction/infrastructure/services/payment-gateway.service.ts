import { Injectable } from '@nestjs/common';
import { ChapaService } from 'chapa-nestjs';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';
import { User } from 'src/modules/users/domain/entity/user.entity';

@Injectable()
export class PaymentGatewayService {
  constructor(private readonly chapaService: ChapaService) {}
  async capturePayment(
    transaction: Transaction,
    user: User,
  ): Promise<{ success: boolean; message: string }> {
    // const callback_url = `https://addis-spare-api.onrender.com/transactions/validate/${transaction.getId()}`;
    try {
      const tx_ref = await this.chapaService.generateTransactionReference();
      const response = await this.chapaService.initialize({
        first_name: user.getName().split(' ')[0],
        last_name:
          user.getName().split(' ').length >= 2
            ? user.getName().split(' ')[1]
            : user.getName(),
        email: user.getEmail(),
        currency: transaction.getCurrency(),
        amount: `${transaction.getAmount()}`,
        tx_ref,
        callback_url:
          'https://webhook.site/861304c1-9b12-423c-9814-06a1db53e6c8',
        return_url: `https://addis-spare-api.onrender.com/`,
        customization: {
          title: 'Order Payment',
          description: 'Please complete your checkout for your order.',
        },
      });
      if (response.status === 'success') {
        return { success: true, message: response.data.checkout_url };
      }
      return {
        success: false,
        message: response.message || 'failed to create a checkout session',
      };
    } catch (err: any) {
      console.log(err);
      return { success: false, message: err?.message };
    }
  }

  refundPayment(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }

  async verifyPayment(
    transaction: Transaction,
    trx_id: string,
    trx_ref: string,
  ): Promise<void> {
    const response = await this.chapaService.verify({
      tx_ref: trx_ref,
    });
    if (response.status === 'success') {
      return;
    }

    throw new Error('failed to verify the given transacton');
  }

  voidPayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }
}
