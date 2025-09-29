import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import {
  RESET_TOKEN_REPOSITORY,
  ResetTokenRepository,
} from '../../domain/repositories/reset-token.repository';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';
import { BcryptHelper } from '../helpers/bcrypt.helpers';
import {
  REFRESH_TOKEN_REPOSITORY,
  RefreshTokenRepository,
} from '../../domain/repositories/refresh-token.repository';
import { AuthTokenHelper } from '../helpers/refresh-token.helpers';
import { AuthTokenResponse } from '../dto/auth-token.response.dto';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from 'src/modules/notification/domain/repositories/notification.repository';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject(RESET_TOKEN_REPOSITORY)
    private readonly tokenRepository: ResetTokenRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtTokenService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(dto: ResetPasswordDto): Promise<AuthTokenResponse> {
    const resetToken = await this.tokenRepository.findById(dto.tokenId);
    if (!resetToken) {
      throw new BadRequestException('token not found');
    }

    if (resetToken.getExpiryDate() < new Date()) {
      throw new BadRequestException('token is expired');
    }

    // Update the user
    const user = await this.userRepository.findById(resetToken.getUserId());
    if (!user) {
      throw new BadRequestException('user not found with that token');
    }

    const newPasswordHash = await BcryptHelper.hash(dto.password);
    user.update(
      user.getEmail(),
      user.getName(),
      newPasswordHash,
      user.getContact(),
      user.getRole(),
    );
    await this.userRepository.update(user);

    // Invalidate the reset token
    resetToken.update(
      resetToken.getUserId(),
      resetToken.getResetToken(),
      new Date(),
    );
    await this.tokenRepository.update(resetToken);
    const refToken = await this.refreshTokenRepository.findByUserId(
      user.getId(),
    );

    return AuthTokenHelper.generateAuthTokens(
      refToken,
      user,
      this.jwtService,
      this.refreshTokenRepository,
    );
  }
}
