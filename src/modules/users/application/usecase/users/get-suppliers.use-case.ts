import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';
import { User } from 'src/modules/users/domain/entity/user.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Injectable()
export class GetSuppliersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    const suppliers = users.filter(
      (user) =>
        user.getRole() === UserRole.SUPPLIER &&
        user.getSupplierDetails() !== null &&
        user.getSupplierDetails() !== undefined &&
        user.getSupplierDetails()!.isVerified === false,
    );

    return suppliers;
  }
}
