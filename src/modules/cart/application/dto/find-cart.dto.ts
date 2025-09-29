import { IsNotEmpty, ValidateNested } from 'class-validator';

export class FindCartByUserDto {
  @IsNotEmpty()
  userId: string;
}

export class FindCartByIdDto {
  @IsNotEmpty()
  id: string;
}
