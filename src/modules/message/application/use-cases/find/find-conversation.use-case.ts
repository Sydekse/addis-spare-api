import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '../../../domain/entities/message.entity';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '../../../domain/repositories/message.repository';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MessagesByOtherUserDTO {
  user: UserInfo;
  messages: Message[];
}

@Injectable()
export class FindConversationsUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Collect all messages for userId, then group them by the other user
   */
  async execute(userId: string): Promise<MessagesByOtherUserDTO[]> {
    // Step 1: fetch all messages where the user is either sender or recipient
    const messages = await this.messageRepository.findConversations(userId);
    if (!messages || messages.length === 0) return [];

    const conversationMap: Record<string, MessagesByOtherUserDTO> = {};

    for (const message of messages) {
      // Determine the "other user" in this message
      const otherUserId =
        message.getSenderId() === userId
          ? message.getRecipientId()
          : message.getSenderId();

      // Step 2: fetch other user's info if not already in map
      if (!conversationMap[otherUserId]) {
        const user = await this.userRepository.findById(otherUserId);
        if (!user) throw new NotFoundException(`User ${otherUserId} not found`);

        conversationMap[otherUserId] = {
          user: {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            avatar: 'https://google.com/po.jpg', // replace with actual avatar
          },
          messages: [],
        };
      }

      // Step 3: add message to the correct "other user" group
      conversationMap[otherUserId].messages.push(message);
    }

    // Step 4: sort each conversation's messages chronologically
    Object.values(conversationMap).forEach((conv) => {
      conv.messages.sort(
        (a, b) => a.getSentAt().getTime() - b.getSentAt().getTime(),
      );
    });

    // Step 5: return array of conversations grouped by other user
    return Object.values(conversationMap);
  }
}
