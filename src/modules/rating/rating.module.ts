import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingTypeOrmEntity } from './infrastructure/persistence/typeorm/rating-typeorm.entity';
import { RatingController } from './interfaces/http/controllers/rating.controller';
import { CreateRatingUseCase } from './application/use-cases/create/create-rating.use-case';
import { RatingTypeOrmRepository } from './infrastructure/persistence/repositories/rating-typeorm.repository';
import { RATING_REPOSITORY } from './domain/repositories/rating.repository';
import { UserModule } from '../users/user.module';
import { ProductModule } from '../product/product.module';
import { UpdateRatingUseCase } from './application/use-cases/update/update-rating.use-case';
import { FindRatingByIdUseCase } from './application/use-cases/find/find-rating.use-case';
import { FindRatingsByProductIdUseCase } from './application/use-cases/find/find-rating-by-product-id.use-case';
import { FindAllRatingsUseCase } from './application/use-cases/find/all-rating.use-case';
import { DeleteRatingUseCase } from './application/use-cases/delete/delete-rating.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingTypeOrmEntity]),
    ProductModule,
    UserModule,
  ],
  controllers: [RatingController],
  providers: [
    CreateRatingUseCase,
    UpdateRatingUseCase,
    FindRatingByIdUseCase,
    FindRatingsByProductIdUseCase,
    FindAllRatingsUseCase,
    DeleteRatingUseCase,
    {
      provide: RATING_REPOSITORY,
      useClass: RatingTypeOrmRepository,
    },
  ],
  exports: [RATING_REPOSITORY],
})
export class RatingModule {}
