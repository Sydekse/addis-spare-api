import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/domain/entity/user.entity';
import { UserRepository } from 'src/modules/users/domain/repository/user.repository';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../typeorm/user-typeorm.entity';
import { UserContact, UserRole } from '../../domain/entity/user-data-types';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.name,
      user.passwordHash,
      user.contact as UserContact,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.name,
      user.passwordHash,
      user.contact as UserContact,
    );
  }
  async save(user: User): Promise<void> {
    const userEntity = new UserTypeOrmEntity();
    userEntity.id = user.getId();
    userEntity.email = user.getEmail();
    userEntity.name = user.getName();
    userEntity.passwordHash = user.getPasswordHash();
    userEntity.contact = user.getContact();
    userEntity.role = user.getRole() ?? UserRole.USER;
    await this.repository.save(userEntity);
  }
  async update(user: User): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: user.getId() },
    });
    // Each field should be updated only if the given user field to be updated is not empty or undefined
    if (!entity) throw new Error('User not found');
    if (user.getName() !== '' && user.getName() !== undefined) {
      entity.name = user.getName();
    }

    if (user.getEmail() !== '' && user.getEmail() !== undefined) {
      entity.email = user.getEmail();
    }
    if (user.getContact() !== undefined) {
      entity.contact = user.getContact();
    }
    if (user.getPasswordHash() !== '' && user.getPasswordHash() !== undefined) {
      entity.passwordHash = user.getPasswordHash();
    }
    if (user.getRole() !== null && user.getRole() !== undefined) {
      entity.role = user.getRole()!;
    }
    entity.updatedAt = new Date();
    await this.repository.save(entity);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
