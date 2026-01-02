import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/modules/users/domain/entity/user.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { SupplierDetailsDto } from '../../dto/users/supplier-details.dto';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';

@Injectable()
export class FillSupplierDetailsUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    id: string,
    supplierDetails: SupplierDetailsDto,
    update: boolean = true,
  ): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.getRole() !== UserRole.SUPPLIER) {
      throw new BadRequestException('User is not a supplier');
    }

    if (!update) {
      supplierDetails.isVerified = true;
    } else {
      supplierDetails.isVerified = true;
    }
    user.fillSupplierDetails(supplierDetails);
    user.onboard();
    await this.userRepository.update(user);
    return user;
  }
}
