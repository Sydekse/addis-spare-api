import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(1)
  score: number;
}
