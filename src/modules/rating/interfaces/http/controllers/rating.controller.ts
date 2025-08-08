import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ACGuard } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { CreateRatingDto } from 'src/modules/rating/application/dto/create-rating.dto';
import { UpdateRatingDto } from 'src/modules/rating/application/dto/update-rating.dto';
import { FindAllRatingsUseCase } from 'src/modules/rating/application/use-cases/find/all-rating.use-case';
import { CreateRatingUseCase } from 'src/modules/rating/application/use-cases/create/create-rating.use-case';
import { DeleteRatingUseCase } from 'src/modules/rating/application/use-cases/delete/delete-rating.use-case';
import { FindRatingsByProductIdUseCase } from 'src/modules/rating/application/use-cases/find/find-rating-by-product-id.use-case';
import { FindRatingByIdUseCase } from 'src/modules/rating/application/use-cases/find/find-rating.use-case';
import { UpdateRatingUseCase } from 'src/modules/rating/application/use-cases/update/update-rating.use-case';
import { Rating } from 'src/modules/rating/domain/entities/rating.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('ratings')
@UseGuards(JwtAuthGuard, ACGuard)
@UsePipes(new ValidationPipe())
export class RatingController {
  constructor(
    private readonly createRatingUseCase: CreateRatingUseCase,
    private readonly findAllRatingsUseCase: FindAllRatingsUseCase,
    private readonly findRatingByIdUseCase: FindRatingByIdUseCase,
    private readonly updateRatingUseCase: UpdateRatingUseCase,
    private readonly findRatingsByProductUseCase: FindRatingsByProductIdUseCase,
    private readonly deleteRatingUseCase: DeleteRatingUseCase,
  ) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateRatingDto): Promise<Rating> {
    const userId: string = req.user.id || uuidv4();
    return this.createRatingUseCase.execute(userId, dto);
  }

  @Get('for-product/:id')
  async forProduct(@Param('id') id: string): Promise<Rating[]> {
    return await this.findRatingsByProductUseCase.execute(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rating | null> {
    return this.findRatingByIdUseCase.execute(id);
  }

  @Get()
  async findAll(): Promise<Rating[]> {
    return this.findAllRatingsUseCase.execute();
  }

  @Put(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateRatingDto,
  ) {
    const userId: string = req.user.id || uuidv4();
    return this.updateRatingUseCase.execute(id, userId, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteRatingUseCase.execute(id);
  }
}
