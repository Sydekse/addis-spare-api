import { Review } from '../entities/review.entity';

export const REVIEW_REPOSITORY = Symbol.for('ReviewRepository');

export interface ReviewRepository {
  findById(id: string): Promise<Review | null>;
  findByUserIdAndProductId(userId: string, productId: string): Promise<Review | null>;
  save(review: Review): Promise<void>;
  update(review: Review): Promise<void>;
}