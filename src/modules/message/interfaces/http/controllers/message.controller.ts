import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateMessageUseCase } from '../../../application/use-cases/create/create-message.use-case';
import { CreateMessageDto } from '../../../application/dto/create-message.dto';
import { UpdateMessageDto } from '../../../application/dto/update-message.dto';
import { Message } from '../../../domain/entities/message.entity';
import { UpdateMessageUseCase } from '../../../application/use-cases/update/update-message.use-case';
import { FindMessageByIdUseCase } from '../../../application/use-cases/find/find-by-id.use-case';
import { DeleteMessageUseCase } from '../../../application/use-cases/delete/delete-message.use-case';
import { FindAllMessagesUseCase } from '../../../application/use-cases/find/find-all-messages.use-case';
import { FindMessageByThreadUseCase } from 'src/modules/message/application/use-cases/find/find-messages-by-thread.use-case';
import { ACGuard } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard, ACGuard)
export class MessageController {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly updateMessageUseCase: UpdateMessageUseCase,
    private readonly findMessageByIdUseCase: FindMessageByIdUseCase,
    private readonly findAllMessagesUseCase: FindAllMessagesUseCase,
    private readonly findMessagesByThreadUseCase: FindMessageByThreadUseCase,
    private readonly deleteMessageUseCase: DeleteMessageUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateMessageDto): Promise<Message> {
    return this.createMessageUseCase.execute(dto);
  }

  @Get('thread/:conversationId')
  async findByThread(
    @Param('conversationId') conversationId: string,
  ): Promise<Message[]> {
    return this.findMessagesByThreadUseCase.execute(conversationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.findMessageByIdUseCase.execute(id);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.findAllMessagesUseCase.execute();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMessageDto,
  ): Promise<Message> {
    return this.updateMessageUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteMessageUseCase.execute(id);
  }
}
