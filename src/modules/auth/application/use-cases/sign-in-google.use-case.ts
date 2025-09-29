import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';
import {
  REFRESH_TOKEN_REPOSITORY,
  RefreshTokenRepository,
} from '../../domain/repositories/refresh-token.repository';
import { AuthTokenHelper } from '../helpers/refresh-token.helpers';
import { AuthTokenResponse } from '../dto/auth-token.response.dto';

@Injectable()
export class SignInWithGoogleUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute(email: string): Promise<AuthTokenResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

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
