import { Message } from '../entities/message.entity';

export class MessageUpdatedEvent {
  constructor(public readonly message: Message) {}
}
