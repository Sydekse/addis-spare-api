import {Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/domain/entity/user.entity';
import { UserRepository } from 'src/modules/users/domain/repository/user.repository';
import { UpdateUserDto } from 'src/modules/users/application/dto/users/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,) {}

    async execute(userToUpdate: UpdateUserDto): Promise<void> {
        const user = User.create(
            userToUpdate.id,
            userToUpdate.email,
            userToUpdate.name,
            userToUpdate.passwordHash,
            userToUpdate.contact,
            userToUpdate.role
        );
        await this.userRepository.update(user);
    }
}