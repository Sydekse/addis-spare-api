import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '../../../domain/entities/message.entity';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '../../../domain/repositories/message.repository';
import { UpdateMessageDto } from '../../dto/update-message.dto';

@Injectable()
export class UpdateMessageUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(id: string, dto: UpdateMessageDto): Promise<Message> {
    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new NotFoundException('message does not exist');
    }

    message.update(
      message.getId(),
      message.getConversationId(),
      message.getSenderId(),
      message.getRecipientId(),
      dto.body,
      dto.attachments,
      message.getSentAt(),
      message.getReadAt(),
    );

    await this.messageRepository.update(message);
    return message;
  }
}
