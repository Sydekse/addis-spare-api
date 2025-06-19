import { Injectable } from "@nestjs/common";
import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { CreateUserDto } from "../../dto/create-user.dto";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        const user = User.create(
            createUserDto.id,
            createUserDto.email,
            createUserDto.name,
            createUserDto.phone,
        );
        await this.userRepository.save(user);
        return user;
    }
}