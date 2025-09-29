import { Inject, Injectable } from '@nestjs/common';
import {
  RATING_REPOSITORY,
  RatingRepository,
} from 'src/modules/rating/domain/repositories/rating.repository';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';

@Injectable()
export class FindRatingsByProductIdUseCase {
  constructor(
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: RatingRepository,
  ) {}

  async execute(id: string): Promise<Rating[]> {
    return this.ratingRepository.findByProductId(id);
  }
}
