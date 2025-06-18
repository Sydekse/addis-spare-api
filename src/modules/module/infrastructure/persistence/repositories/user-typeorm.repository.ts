import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/module/domain/entities/user.entity";
import { UserRepository } from "src/modules/module/domain/repositories/user.repository";
import { Repository } from "typeorm";
import { UserTypeOrmEntity } from "../typeorm/user-typeorm.entity";

@Injectable()

export class UserTypeOrmRepository implements UserRepository {
    constructor(@InjectRepository(UserTypeOrmEntity) private readonly repository: Repository<UserTypeOrmEntity>
    ){}
    async findById(id: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) return null;

        return new User(
            user.id,
            user.email,
            user.name,
            user.phone
            );
    }
    async save(user: User): Promise<void> {
        const userEntity = new UserTypeOrmEntity();
        userEntity.id = user.getId();
        userEntity.email = user.getEmail();
        userEntity.name = user.getName();
        userEntity.phone = user.getPhone();
        await this.repository.save(userEntity);
    }
    async update(user: User): Promise<void> {
        const entity = await this.repository.findOne({ where: { id: user.getId() } });
        if (!entity) throw new Error('User not found');
        entity.name = user.getName();
        entity.email = user.getEmail();
        entity.phone = user.getPhone();
        entity.updatedAt = new Date();
        await this.repository.save(entity);
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

}