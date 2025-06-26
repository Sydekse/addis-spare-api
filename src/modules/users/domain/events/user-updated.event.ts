import { User } from 'src/modules/users/domain/entity/user.entity';
export class UserUpdatedEvent {
  constructor(public user: User) {}
}
