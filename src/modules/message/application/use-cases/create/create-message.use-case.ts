import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../../domain/entities/message.entity';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '../../../domain/repositories/message.repository';
import { CreateMessageDto } from '../../dto/create-message.dto';

@Injectable()
export class CreateMessageUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(dto: CreateMessageDto): Promise<Message> {
    if (dto.conversationId === null || dto.conversationId.trim() === '') {
      dto.conversationId = uuidv4();
    }

    const message = Message.create(
      uuidv4(),
      dto.conversationId,
      dto.senderId,
      dto.recipientId,
      dto.body,
      dto.attachments,
      new Date(),
    );

    await this.messageRepository.save(message);
    return message;
  }
}
