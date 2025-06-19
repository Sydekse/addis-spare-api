import {Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,) {}

    async execute(userToUpdate: UpdateUserDto): Promise<void> {
        const user = User.create(
            userToUpdate.id,
            userToUpdate.email,
            userToUpdate.name,
            userToUpdate.phone,
        );
        await this.userRepository.update(user);
    }
}