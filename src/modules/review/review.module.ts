import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { REVIEW_REPOSITORY } from 'src/modules/review/domain/repositories/review.repository';
import { ReviewTypeOrmEntity } from 'src/modules/review/infrastructure/typeorm/review-typeorm.entity';
import { ReviewController } from 'src/modules/review/interfaces/http/controllers/review.controller';
import { CreateReviewUseCase } from 'src/modules/review/application/use-cases/create-review.use-case';
import { UpdateReviewUseCase } from 'src/modules/review/application/use-cases/update-review.use-case';
import { ReviewTypeOrmRepository } from 'src/modules/review/infrastructure/repositories/review-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewTypeOrmEntity])],
  controllers: [ReviewController],
  providers: [
    CreateReviewUseCase,
    UpdateReviewUseCase,
    {
      provide: REVIEW_REPOSITORY,
      useClass: ReviewTypeOrmRepository,
    },
  ],
  exports: [REVIEW_REPOSITORY],
})
export class ReviewsModule {}
