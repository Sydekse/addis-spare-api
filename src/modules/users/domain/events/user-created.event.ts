import { User } from "../entity/user.entity";
export class UserCreatedEvent {
    constructor(public user: User) {}
}