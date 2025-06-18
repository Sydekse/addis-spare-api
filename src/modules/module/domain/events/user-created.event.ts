import { User } from '../entities/user.entity';
export class UserCreatedEvent {
    constructor(public user: User) {}
}