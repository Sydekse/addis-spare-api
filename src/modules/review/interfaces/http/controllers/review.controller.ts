import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { CreateReviewDto } from 'src/modules/review/application/dto/create-review.dto';
import { UpdateReviewDto } from 'src/modules/review/application/dto/update-review.dto';
import { CreateReviewUseCase } from 'src/modules/review/application/use-cases/create-review.use-case';
import { UpdateReviewUseCase } from 'src/modules/review/application/use-cases/update-review.use-case';


@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
  ) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.createReviewUseCase.execute(createReviewDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    await this.updateReviewUseCase.execute(id, updateReviewDto);
    return { message: 'Review updated successfully' };
  }
}