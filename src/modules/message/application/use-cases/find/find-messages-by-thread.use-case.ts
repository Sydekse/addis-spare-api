import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../../domain/entities/message.entity';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '../../../domain/repositories/message.repository';

@Injectable()
export class FindMessageByThreadUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(conversationId: string): Promise<Message[]> {
    return this.messageRepository.findByThread(conversationId);
  }
}
