import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';
import { AuthTokenResponse } from '../dto/auth-token.response.dto';
import { AuthTokenHelper } from '../helpers/refresh-token.helpers';
import {
  REFRESH_TOKEN_REPOSITORY,
  RefreshTokenRepository,
} from '../../domain/repositories/refresh-token.repository';
import { BcryptHelper } from '../helpers/bcrypt.helpers';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute(dto: SignInDto): Promise<AuthTokenResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const validPassword = await BcryptHelper.compare(
      dto.password,
      user.getPasswordHash(),
    );
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
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
