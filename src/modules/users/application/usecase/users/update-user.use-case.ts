import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { UpdateUserDto } from 'src/modules/users/application/dto/users/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userToUpdate: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findById(userToUpdate.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.update(
      user.getEmail(),
      userToUpdate.name,
      user.getPasswordHash(),
      userToUpdate.contact,
      user.getRole(),
      user.getSupplierDetails(),
    );

    await this.userRepository.update(user);
  }
}
