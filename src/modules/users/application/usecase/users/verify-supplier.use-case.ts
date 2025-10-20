import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';

@Injectable()
export class VerifySupplierUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(adminId: string, userId: string): Promise<void> {
    const adminUser = await this.userRepository.findById(adminId);
    if (!adminUser) {
      throw new BadRequestException('Admin user not found');
    }

    if (adminUser.getRole() !== UserRole.ADMIN) {
      throw new BadRequestException('Only admin users can verify suppliers');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.getRole() !== UserRole.SUPPLIER) {
      throw new BadRequestException('User is not a supplier');
    }

    user.verifySupplier();

    await this.userRepository.update(user);
  }
}
