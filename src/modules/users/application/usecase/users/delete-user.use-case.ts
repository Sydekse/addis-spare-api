import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/domain/repository/user.repository';
import { DeleteUserDto } from 'src/modules/users/application/dto/users/delete-user.dto';


@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userToDelete: DeleteUserDto): Promise<void> {
        await this.userRepository.delete(userToDelete.id);
    }
}