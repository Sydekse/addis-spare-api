import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  reviewId?: string;

  @IsString()
  @MinLength(10, { message: 'Review body must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Review body must not exceed 1000 characters' })
  body: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
