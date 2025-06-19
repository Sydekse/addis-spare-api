import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { FindUserDto } from '../../dto/find-user.dto';
import { User } from '../../../domain/entities/user.entity';
@Injectable()
export class FindUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userToFind: FindUserDto): Promise<User | null> {
        const user = await this.userRepository.findById(userToFind.id);
        return user;
    }
}