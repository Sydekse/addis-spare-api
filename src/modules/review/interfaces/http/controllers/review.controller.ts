import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Inject,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import { CreateReviewDto } from 'src/modules/review/application/dto/create-review.dto';
import { UpdateReviewDto } from 'src/modules/review/application/dto/update-review.dto';
import { CreateReviewUseCase } from 'src/modules/review/application/use-cases/create-review.use-case';
import { UpdateReviewUseCase } from 'src/modules/review/application/use-cases/update-review.use-case';
import { Review } from 'src/modules/review/domain/entities/review.entity';
import {
  REVIEW_REPOSITORY,
  ReviewRepository,
} from 'src/modules/review/domain/repositories/review.repository';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.createReviewUseCase.execute(createReviewDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Review | null> {
    return this.reviewRepository.findById(id);
  }

  @Get()
  async find(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }

  @Get('for-product/:id')
  async findByProduct(@Param('id') id: string): Promise<Review[]> {
    return this.reviewRepository.findByProductId(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    await this.updateReviewUseCase.execute(id, updateReviewDto);
    return { message: 'Review updated successfully' };
  }
}
