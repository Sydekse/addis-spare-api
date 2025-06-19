import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/module/application/dto/create-user.dto';
import { FindUserDto } from 'src/modules/module/application/dto/find-user.dto';
import { CreateUserUseCase } from 'src/modules/module/application/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/module/application/use-cases/users/delete-user.use-case';
import { FindUserUseCase } from 'src/modules/module/application/use-cases/users/find-user.use-case';
import { UpdateUserUseCase } from 'src/modules/users/application/usecase/users/update-user.use-case';
import { User } from 'src/modules/users/domain/entity/user.entity';

@Controller('users')  
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserById: FindUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase) {}


  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.createUserUseCase.execute(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: FindUserDto): Promise<User | null> {
    return await this.findUserById.execute(id);
  }

  @Post('delete')
  async delete(@Body() dto: FindUserDto): Promise<void> {
    return await this.deleteUserUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id:  string,
    @Body() dto: CreateUserDto,
  ): Promise<void> {
    dto.id = id; 
    return await this.updateUserUseCase.execute(dto);
  }
}