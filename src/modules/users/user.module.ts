import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './infrastructure/typeorm/user-typeorm.entity';
import { UserController } from './interface/http/controllers/user.controller';
import { CreateUserUseCase } from './application/usecase/users/create-user.use-case';
import { DeleteUserUseCase } from './application/usecase/users/delete-user.use-case';
import { FindUserUseCase } from './application/usecase/users/find-user.use-case';
import { UpdateUserUseCase } from './application/usecase/users/update-user.use-case';
import { UserTypeOrmRepository } from './infrastructure/repositories/user-typeorm.repository';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { FillSupplierDetailsUseCase } from './application/usecase/users/fill-supplier-details.use-case';
import { GetSuppliersUseCase } from './application/usecase/users/get-suppliers.use-case';
import { VerifySupplierUseCase } from './application/usecase/users/verify-supplier.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserUseCase,
    UpdateUserUseCase,
    VerifySupplierUseCase,
    FillSupplierDetailsUseCase,
    GetSuppliersUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
