import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/domain/entity/user.entity";
import { UserRepository } from "src/modules/users/domain/repository/user.repository";
import { CreateUserDto } from "src/modules/users/application/dto/users/create-user.dto";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        const user = User.create(
            createUserDto.id,
            createUserDto.email,
            createUserDto.name,
            createUserDto.passwordHash,
            createUserDto.contact,
        );
        await this.userRepository.save(user);
        return user;
    }
}