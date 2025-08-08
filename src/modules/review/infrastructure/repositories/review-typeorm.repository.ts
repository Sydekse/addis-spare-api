import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../domain/entities/review.entity';
import { ReviewRepository } from '../../domain/repositories/review.repository';
import { ReviewTypeOrmEntity } from '../typeorm/review-typeorm.entity';

@Injectable()
export class ReviewTypeOrmRepository implements ReviewRepository {
  constructor(
    @InjectRepository(ReviewTypeOrmEntity)
    private readonly repository: Repository<ReviewTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Review | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Review(entity.userId, entity.productId, entity.body, entity.id);
  }

  async findByUserIdAndProductId(userId: string, productId: string): Promise<Review | null> {
    const entity = await this.repository.findOne({ where: { userId, productId } });
    if (!entity) return null;
    return new Review(entity.userId, entity.productId, entity.body, entity.id);
  }

  async save(review: Review): Promise<void> {
    const entity = new ReviewTypeOrmEntity();
    entity.id = review.getId();
    entity.userId = review.getUserId();
    entity.productId = review.getProductId();
    entity.body = review.getBody();
    entity.createdAt = review.getCreatedAt();
    entity.updatedAt = review.getUpdatedAt();
    await this.repository.save(entity);
  }

  async update(review: Review): Promise<void> {
    await this.repository.update(
      { id: review.getId() },
      {
        body: review.getBody(),
        updatedAt: review.getUpdatedAt(),
      },
    );
  }
}