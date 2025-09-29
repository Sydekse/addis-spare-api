import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionTypeOrmEntity } from '../typeorm/transaction-typeorm.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../../domain/entity/transaction.entity';
import { TransactionRepository } from '../../domain/repository/transaction.repository';

@Injectable()
export class TransactionTypeOrmRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionTypeOrmEntity)
    private readonly repository: Repository<TransactionTypeOrmEntity>,
  ) {}
  async findByGatewayMessage(msg: string): Promise<Transaction | null> {
    const entity = await this.repository.findOne({
      where: {
        gatewayResponse: msg,
      },
    });
    if (!entity) return null;
    return new Transaction(
      entity.id,
      entity.orderId,
      entity.amount,
      entity.currency,
      entity.type,
      entity.status,
      entity.userId,
      entity.gatewayResponse,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(transaction: Transaction): Promise<void> {
    const entity = this.repository.create({
      id: transaction.getId(),
      orderId: transaction.getOrderId(),
      amount: transaction.getAmount(),
      currency: transaction.getCurrency(),
      type: transaction.getType(),
      status: transaction.getStatus(),
      userId: transaction.getUserId(),
      gatewayResponse: transaction.getGatewayResponse(),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt(),
    });
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<Transaction | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Transaction(
      entity.id,
      entity.orderId,
      entity.amount,
      entity.currency,
      entity.type,
      entity.status,
      entity.userId,
      entity.gatewayResponse,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByOrderId(orderId: string): Promise<Transaction[]> {
    const entities = await this.repository.find({ where: { orderId } });
    return entities.map(
      (entity) =>
        new Transaction(
          entity.id,
          entity.orderId,
          entity.amount,
          entity.currency,
          entity.type,
          entity.status,
          entity.userId,
          entity.gatewayResponse,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }
}
