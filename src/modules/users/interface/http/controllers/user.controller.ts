import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Inject,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { CreateUserDto } from 'src/modules/users/application/dto/users/create-user.dto';
import { DeleteUserDto } from 'src/modules/users/application/dto/users/delete-user.dto';
import { SupplierDetailsDto } from 'src/modules/users/application/dto/users/supplier-details.dto';
import { UpdateUserDto } from 'src/modules/users/application/dto/users/update-user.dto';
import { CreateUserUseCase } from 'src/modules/users/application/usecase/users/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/users/application/usecase/users/delete-user.use-case';
import { FillSupplierDetailsUseCase } from 'src/modules/users/application/usecase/users/fill-supplier-details.use-case';
import { FindUserUseCase } from 'src/modules/users/application/usecase/users/find-user.use-case';
import { GetSuppliersUseCase } from 'src/modules/users/application/usecase/users/get-suppliers.use-case';
import { UpdateUserUseCase } from 'src/modules/users/application/usecase/users/update-user.use-case';
import { VerifySupplierUseCase } from 'src/modules/users/application/usecase/users/verify-supplier.use-case';
import { User } from 'src/modules/users/domain/entity/user.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserById: FindUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly fillSupplierDetailsUseCase: FillSupplierDetailsUseCase,
    private readonly verifySupplierUseCase: VerifySupplierUseCase,
    private readonly getSuppliersUseCase: GetSuppliersUseCase,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.createUserUseCase.execute(dto);
  }

  @Put(':id/verify-supplier')
  @UseGuards(JwtAuthGuard)
  async verifySupplier(@Req() req, @Param('id') id: string): Promise<void> {
    const adminId: string = req.user.id || uuidv4();
    return await this.verifySupplierUseCase.execute(adminId, id);
  }

  @Get('suppliers')
  async getSuppliers(): Promise<any[]> {
    return await this.getSuppliersUseCase.execute();
  }

  @Post(':id/supplier-details')
  async fillSupplierDetails(
    @Param('id') id: string,
    @Body() supplierDetailsDto: SupplierDetailsDto,
  ): Promise<User> {
    return await this.fillSupplierDetailsUseCase.execute(
      id,
      supplierDetailsDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.findUserById.execute({ id });
  }

  @Put(':id/supplier-details')
  async updateSupplier(
    @Param('id') id: string,
    @Body() dto: SupplierDetailsDto,
  ) {
    return await this.fillSupplierDetailsUseCase.execute(id, dto, true);
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
