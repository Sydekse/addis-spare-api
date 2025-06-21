import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenTypeOrmEntity } from '../typeorm/refresh-token-typeorm.entity';
import { RefreshTokenRepository } from 'src/modules/auth/domain/repositories/refresh-token.repository';
import { RefreshToken } from 'src/modules/auth/domain/entities/refresh-tokens.entity';

@Injectable()
export class RefreshTokenTypeOrmRepository implements RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenTypeOrmEntity)
    private readonly repository: Repository<RefreshTokenTypeOrmEntity>,
  ) {}
  async findByUserId(userId: string): Promise<RefreshToken> {
    const entity = await this.repository.findOne({ where: { userId } });
    if (!entity) {
      throw new Error('this is impossible');
    }

    return new RefreshToken(
      entity.id,
      entity.userId,
      entity.refreshToken,
      entity.expiryDate,
    );
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new RefreshToken(
      entity.id,
      entity.userId,
      entity.refreshToken,
      entity.expiryDate,
    );
  }

  async findAll(): Promise<RefreshToken[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new RefreshToken(
          entity.id,
          entity.userId,
          entity.refreshToken,
          entity.expiryDate,
        ),
    );
  }

  async save(token: RefreshToken): Promise<void> {
    const entity = new RefreshTokenTypeOrmEntity();
    entity.id = token.getId();
    entity.refreshToken = token.getRefreshToken();
    entity.expiryDate = token.getExpiryDate();
    entity.userId = token.getUserId();
    entity.createdAt = token.getCreatedAt();
    entity.updatedAt = token.getUpdatedAt();

    await this.repository.save(entity);
  }

  async update(token: RefreshToken): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: token.getId() },
    });
    if (!entity) throw new Error('Module not found');

    entity.id = token.getId();
    entity.refreshToken = token.getRefreshToken();
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
