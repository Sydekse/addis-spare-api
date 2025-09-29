import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '../../../domain/entities/message.entity';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '../../../domain/repositories/message.repository';

@Injectable()
export class FindMessageByIdUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(id: string): Promise<Message> {
    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new NotFoundException('message is not found');
    }

    return message;
  }
}
