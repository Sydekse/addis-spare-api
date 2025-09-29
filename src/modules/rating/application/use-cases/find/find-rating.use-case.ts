import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import {
  RATING_REPOSITORY,
  RatingRepository,
} from 'src/modules/rating/domain/repositories/rating.repository';

@Injectable()
export class FindRatingByIdUseCase {
  constructor(
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: RatingRepository,
  ) {}

  async execute(id: string): Promise<Rating | null> {
    const rating = await this.ratingRepository.findById(id);

    if (!rating) {
      throw new NotFoundException('rating not found');
    }

    return rating;
  }
}
