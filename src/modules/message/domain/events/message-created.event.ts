import { Message } from '../entities/message.entity';

export class MessageCreatedEvent {
  constructor(public readonly message: Message) {}
}
