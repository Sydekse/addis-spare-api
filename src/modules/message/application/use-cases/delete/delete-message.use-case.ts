import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '../../../domain/repositories/message.repository';

@Injectable()
export class DeleteMessageUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new NotFoundException('message is not found');
    }

    await this.messageRepository.delete(id);
  }
}
