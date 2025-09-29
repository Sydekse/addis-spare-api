import { User } from 'src/modules/users/domain/entity/user.entity';

export const USER_REPOSITORY = Symbol.for('UserRepository');

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
