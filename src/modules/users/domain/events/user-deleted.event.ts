import { User } from 'src/modules/users/domain/entity/user.entity';

export class UserDeletedEvent {
    constructor(public user: User) {}
}