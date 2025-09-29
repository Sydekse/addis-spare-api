import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './interfaces/http/controllers/message.controller';
import { CreateMessageUseCase } from './application/use-cases/create/create-message.use-case';
import { MessageTypeormEntity } from './infrastructure/persistence/typeorm/message-typeorm.entity';
import { MessageTypeormRepository } from './infrastructure/persistence/repositories/message-typeorm.repository';
import { UpdateMessageUseCase } from './application/use-cases/update/update-message.use-case';
import { DeleteMessageUseCase } from './application/use-cases/delete/delete-message.use-case';
import { FindMessageByIdUseCase } from './application/use-cases/find/find-by-id.use-case';
import { FindAllMessagesUseCase } from './application/use-cases/find/find-all-messages.use-case';
import { MESSAGE_REPOSITORY } from './domain/repositories/message.repository';
import { FindMessageByThreadUseCase } from './application/use-cases/find/find-messages-by-thread.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MessageTypeormEntity])],
  controllers: [MessageController],
  providers: [
    CreateMessageUseCase,
    UpdateMessageUseCase,
    FindMessageByThreadUseCase,
    DeleteMessageUseCase,
    FindMessageByIdUseCase,
    FindAllMessagesUseCase,
    {
      provide: MESSAGE_REPOSITORY,
      useClass: MessageTypeormRepository,
    },
  ],
  exports: [MESSAGE_REPOSITORY],
})
export class MessageModule {}
