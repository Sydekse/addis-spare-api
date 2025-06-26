import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetToken } from 'src/modules/auth/domain/entities/reset-tokens.entity';
import { ResetTokenRepository } from '../../../domain/repositories/reset-token.repository';
import { ResetTokenTypeOrmEntity } from '../typeorm/reset-token-typeorm.entity';

@Injectable()
export class ResetTokenTypeOrmRepository implements ResetTokenRepository {
  constructor(
    @InjectRepository(ResetTokenTypeOrmEntity)
    private readonly repository: Repository<ResetTokenTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<ResetToken | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new ResetToken(
      entity.id,
      entity.userId,
      entity.resetToken,
      entity.expiryDate,
    );
  }

  async findAll(): Promise<ResetToken[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new ResetToken(
          entity.id,
          entity.userId,
          entity.resetToken,
          entity.expiryDate,
        ),
    );
  }

  async save(token: ResetToken): Promise<void> {
    const entity = new ResetTokenTypeOrmEntity();
    entity.id = token.getId();
    entity.resetToken = token.getResetToken();
    entity.expiryDate = token.getExpiryDate();
    entity.userId = token.getUserId();
    entity.createdAt = token.getCreatedAt();
    entity.updatedAt = token.getUpdatedAt();

    await this.repository.save(entity);
  }

  async update(token: ResetToken): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: token.getId() },
    });
    if (!entity) throw new Error('Module not found');

    entity.id = token.getId();
    entity.resetToken = token.getResetToken();
    entity.expiryDate = token.getExpiryDate();
    entity.userId = token.getUserId();
    entity.createdAt = token.getCreatedAt();
    entity.updatedAt = token.getUpdatedAt();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
