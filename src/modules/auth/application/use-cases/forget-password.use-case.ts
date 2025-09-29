import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { ResetToken } from '../../domain/entities/reset-tokens.entity';
import {
  RESET_TOKEN_REPOSITORY,
  ResetTokenRepository,
} from '../../domain/repositories/reset-token.repository';
import { BcryptHelper } from '../helpers/bcrypt.helpers';
import {
  CreateNotificationDto,
  NotificationChannel,
  NotificationStatus,
} from 'src/modules/notification/application/dto/create-notification.dto';
import { CreateNotificationUseCase } from 'src/modules/notification/application/use-cases/create/create-notification.use-case';
import { ForgetPasswordDto } from '../dto/forget-password.dto';

@Injectable()
export class ForgetPasswordUseCase {
  constructor(
    @Inject(RESET_TOKEN_REPOSITORY)
    private readonly tokenRepository: ResetTokenRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  // TODO: can you improve this by using caching rather than generating new tokens or invalidate older tokens
  // or delte the older tokens?
  async execute(
    dto: ForgetPasswordDto,
  ): Promise<{ token: string; id: string }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const after24Hrs = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const token = uuidv4();

    const resetToken = ResetToken.create(
      uuidv4(),
      user.getId(),
      await BcryptHelper.hash(token),
      after24Hrs,
    );

    await this.tokenRepository.save(resetToken);

    const notificationDto = new CreateNotificationDto();
    notificationDto.status = NotificationStatus.PENDING;
    notificationDto.userId = user.getId();
    notificationDto.channel = NotificationChannel.GMAIL;
    notificationDto.relatedTo = {
      entity: 'users',
      id: user.getId(),
    };
    notificationDto.message = generateResetPasswordMessage(resetToken.getId());
    notificationDto.subject = 'Password Reset Request';
    await this.createNotificationUseCase.execute(notificationDto);

    return { token, id: resetToken.getId() };
  }
}

function generateResetPasswordMessage(token, expiry = '24 hours') {
  return (
    `Hello,\n\n` +
    `We received a request to reset the password associated with your account. ` +
    `Please use the following token to proceed with resetting your password:\n\n` +
    `🔐 Token: ${token}\n\n` +
    `⚠️ This token will expire in ${expiry}. If you did not request a password reset, you can safely ignore this message. ` +
    `No changes will be made to your account without verification.\n\n` +
    `If you encounter any issues or have questions, feel free to contact our support team.\n\n` +
    `Thanks,\n` +
    `The Support Team`
  );
}
