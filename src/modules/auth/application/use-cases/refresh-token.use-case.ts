import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import {
  REFRESH_TOKEN_REPOSITORY,
  RefreshTokenRepository,
} from '../../domain/repositories/refresh-token.repository';
import { AuthTokenResponse } from '../dto/auth-token.response.dto';
import { AuthTokenHelper } from '../helpers/refresh-token.helpers';
import { BcryptHelper } from '../helpers/bcrypt.helpers';
import { validate, version } from 'uuid';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtTokenService,
  ) {}

  validUUID(s: string) {
    return validate(s) && version(s) == 4;
  }

  async execute(dto: RefreshTokenDto): Promise<AuthTokenResponse> {
    const { id, token } = RefreshTokenDto.decode(dto.refreshToken);

    if (!(this.validUUID(id) && this.validUUID(token))) {
      throw new BadRequestException('invalid token');
    }

    const refToken = await this.refreshTokenRepository.findById(id);
    const valid =
      refToken != null &&
      (await BcryptHelper.compare(token, refToken.getRefreshToken()));
    if (!valid) {
      throw new BadRequestException('Invalid token');
    }

    const expired = refToken.getExpiryDate() < new Date();
    if (expired) {
      throw new BadRequestException('Token expired');
    }

    const user = await this.userRepository.findById(refToken.getUserId());
    if (!user) {
      throw new BadRequestException('user not found');
    }

    return AuthTokenHelper.generateAuthTokens(
      refToken,
      user,
      this.jwtService,
      this.refreshTokenRepository,
    );
  }
}
