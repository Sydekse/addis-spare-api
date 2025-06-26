import { User } from 'src/modules/users/domain/entity/user.entity';

export class UserCreatedEvent {
  constructor(public user: User) {}
}
