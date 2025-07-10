import { Inject, Injectable } from '@nestjs/common';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import {
  RATING_REPOSITORY,
  RatingRepository,
} from 'src/modules/rating/domain/repositories/rating.repository';

@Injectable()
export class FindAllRatingsUseCase {
  constructor(
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: RatingRepository,
  ) {}

  async execute(): Promise<Rating[]> {
    return this.ratingRepository.findAll();
  }
}
