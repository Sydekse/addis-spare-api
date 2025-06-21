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
import { SignInDto } from '../dto/sign-in.dto';
import { BcryptHelper } from '../helpers/bcrypt.helpers';

@Injectable()
export class ForgetPasswordUseCase {
  constructor(
    @Inject(RESET_TOKEN_REPOSITORY)
    private readonly tokenRepository: ResetTokenRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  // TODO: can you improve this by using caching rather than generating new tokens or invalidate older tokens
  // or delte the older tokens?
  async execute(dto: SignInDto): Promise<{ token: string; id: string }> {
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

    return { token, id: resetToken.getId() };
  }
}
