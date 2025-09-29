import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RATING_REPOSITORY,
  RatingRepository,
} from 'src/modules/rating/domain/repositories/rating.repository';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import { UpdateRatingDto } from '../../dto/update-rating.dto';

@Injectable()
export class UpdateRatingUseCase {
  constructor(
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: RatingRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateRatingDto,
  ): Promise<Rating> {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) {
      throw new NotFoundException('rating not found');
    }

    if (rating.getUserId() !== userId) {
      throw new ForbiddenException('forbidden resouce');
    }

    rating.update(rating.getUserId(), rating.getProductId(), dto.score);
    await this.ratingRepository.update(rating);
    return rating;
  }
}
