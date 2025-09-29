import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateReviewDto } from 'src/modules/review/application/dto/update-review.dto';
import {
  REVIEW_REPOSITORY,
  ReviewRepository,
} from 'src/modules/review/domain/repositories/review.repository';

@Injectable()
export class UpdateReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(id: string, updateReviewDto: UpdateReviewDto): Promise<void> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    review.update(updateReviewDto.body);
    await this.reviewRepository.update(review);
  }
}
