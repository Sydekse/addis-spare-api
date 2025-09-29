import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingTypeOrmEntity } from '../typeorm/rating-typeorm.entity';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import { RatingRepository } from 'src/modules/rating/domain/repositories/rating.repository';

@Injectable()
export class RatingTypeOrmRepository implements RatingRepository {
  constructor(
    @InjectRepository(RatingTypeOrmEntity)
    private readonly repository: Repository<RatingTypeOrmEntity>,
  ) {}
  async findByProductId(productId: string): Promise<Rating[]> {
    const entities = await this.repository.find({ where: { productId } });
    return entities.map(
      (entity) =>
        new Rating(entity.id, entity.userId, entity.productId, entity.score),
    );
  }

  async findRatingByUserForProduct(
    userId: string,
    productId: string,
  ): Promise<Rating | null> {
    const entity = await this.repository.findOne({
      where: { userId, productId },
    });
    if (!entity) return null;
    return new Rating(entity.id, entity.userId, entity.productId, entity.score);
  }

  async findById(id: string): Promise<Rating | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new Rating(entity.id, entity.userId, entity.productId, entity.score);
  }

  async findAll(): Promise<Rating[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Rating(entity.id, entity.userId, entity.productId, entity.score),
    );
  }

  async save(rating: Rating): Promise<void> {
    const entity = new RatingTypeOrmEntity();
    entity.id = rating.getId();
    entity.userId = rating.getUserId();
    entity.productId = rating.getProductId();
    entity.score = rating.getScore();
    entity.createdAt = rating.getCreatedAt();
    entity.updatedAt = rating.getUpdatedAt();

    await this.repository.save(entity);
  }

  async update(rating: Rating): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: rating.getId() },
    });
    if (!entity) throw new Error('Rating not found');
    entity.id = rating.getId();
    entity.userId = rating.getUserId();
    entity.productId = rating.getProductId();
    entity.score = rating.getScore();
    entity.updatedAt = rating.getUpdatedAt();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
