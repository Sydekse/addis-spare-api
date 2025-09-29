import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  RATING_REPOSITORY,
  RatingRepository,
} from 'src/modules/rating/domain/repositories/rating.repository';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import { CreateRatingDto } from '../../dto/create-rating.dto';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Injectable()
export class CreateRatingUseCase {
  constructor(
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: RatingRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, dto: CreateRatingDto): Promise<Rating> {
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new NotFoundException('product not found');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const olderRating = await this.ratingRepository.findRatingByUserForProduct(
      userId,
      product.getId(),
    );
    if (olderRating) {
      throw new BadRequestException('you have already rated this product');
    }

    const rating = Rating.create(uuidv4(), userId, dto.productId, dto.score);

    await this.ratingRepository.save(rating);

    return rating;
  }
}
