import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/application/dto/users/create-user.dto';
import { DeleteUserDto } from 'src/modules/users/application/dto/users/delete-user.dto';
import { FindUserDto } from 'src/modules/users/application/dto/users/find-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dto/users/update-user.dto';
import { CreateUserUseCase } from 'src/modules/users/application/usecase/users/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/users/application/usecase/users/delete-user.use-case';
import { FindUserUseCase } from 'src/modules/users/application/usecase/users/find-user.use-case';
import { UpdateUserUseCase } from 'src/modules/users/application/usecase/users/update-user.use-case';
import { User } from 'src/modules/users/domain/entity/user.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserById: FindUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.createUserUseCase.execute(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: FindUserDto): Promise<User | null> {
    return await this.findUserById.execute(id);
  }

  @Post('delete')
  async delete(@Body() dto: DeleteUserDto): Promise<void> {
    return await this.deleteUserUseCase.execute(dto);
  }

  @Get()
  async allUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    dto.id = id;
    return await this.updateUserUseCase.execute(dto);
  }
}
