import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { Review } from 'src/modules/review/domain/entities/review.entity';
import { CreateReviewDto } from 'src/modules/review/application/dto/create-review.dto';
import {
  REVIEW_REPOSITORY,
  ReviewRepository,
} from 'src/modules/review/domain/repositories/review.repository';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(createReviewDto: CreateReviewDto): Promise<Review> {
    // TODO : The product should be validated that the user has purchased it other wise user cannot submit a review for product they haven't purchased.
    // eg : if (product.isPurchasedByUser(createReviewDto.userId)) { ... }

    const existingReview = await this.reviewRepository.findByUserIdAndProductId(
      createReviewDto.userId,
      createReviewDto.productId,
    );
    if (existingReview) {
      throw new ConflictException(
        'User has already submitted a review for this product',
      );
    }

    const review = Review.create(
      createReviewDto.userId,
      createReviewDto.productId,
      createReviewDto.body,
    );
    await this.reviewRepository.save(review);
    return review;
  }
}
