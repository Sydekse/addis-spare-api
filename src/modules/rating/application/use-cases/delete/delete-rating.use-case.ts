import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  RATING_REPOSITORY,
  RatingRepository,
} from 'src/modules/rating/domain/repositories/rating.repository';

@Injectable()
export class DeleteRatingUseCase {
  constructor(
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: RatingRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const rating = await this.ratingRepository.findById(id);

    if (!rating) {
      throw new NotFoundException('rating not found');
    }

    await this.ratingRepository.delete(id);
  }
}
