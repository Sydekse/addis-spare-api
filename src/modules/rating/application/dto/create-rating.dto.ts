import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  score: number;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
