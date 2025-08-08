import { Rating } from '../entities/rating.entity';

export const RATING_REPOSITORY = Symbol.for('RatingRepository');
export interface RatingRepository {
  findById(id: string): Promise<Rating | null>;
  findAll(): Promise<Rating[]>;
  findByProductId(productId: string): Promise<Rating[]>;
  findRatingByUserForProduct(
    userId: string,
    productId: string,
  ): Promise<Rating | null>;
  save(rating: Rating): Promise<void>;
  update(rating: Rating): Promise<void>;
  delete(id: string): Promise<void>;
}
