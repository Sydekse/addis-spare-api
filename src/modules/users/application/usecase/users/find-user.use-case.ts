import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { FindUserDto } from 'src/modules/users/application/dto/users/find-user.dto';
import { User } from 'src/modules/users/domain/entity/user.entity';
@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userToFind: FindUserDto): Promise<User | null> {
    const user = await this.userRepository.findById(userToFind.id);
    return user;
  }
}
