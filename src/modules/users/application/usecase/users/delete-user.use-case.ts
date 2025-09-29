import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { DeleteUserDto } from 'src/modules/users/application/dto/users/delete-user.dto';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userToDelete: DeleteUserDto): Promise<void> {
    await this.userRepository.delete(userToDelete.id);
  }
}
