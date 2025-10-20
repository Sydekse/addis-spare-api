import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { User } from 'src/modules/users/domain/entity/user.entity';
import { SignUpDto } from '../dto/sign-up.dto';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';
import {
  REFRESH_TOKEN_REPOSITORY,
  RefreshTokenRepository,
} from '../../domain/repositories/refresh-token.repository';
import { RefreshToken } from '../../domain/entities/refresh-tokens.entity';
import { AuthTokenResponse } from '../dto/auth-token.response.dto';
import { AuthTokenHelper } from '../helpers/refresh-token.helpers';
import { BcryptHelper } from '../helpers/bcrypt.helpers';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute(dto: SignUpDto): Promise<AuthTokenResponse> {
    const exsistingUser = await this.userRepository.findByEmail(dto.email);
    if (exsistingUser) {
      throw new BadRequestException('email is already taken');
    }

    const passwordHash = await BcryptHelper.hash(dto.password);
    const user = User.create(
      uuidv4(),
      dto.email,
      dto.name,
      passwordHash,
      null,
      dto.role,
      false,
    );
    await this.userRepository.save(user);

    const refreshTokenEnt = RefreshToken.create(
      uuidv4(),
      user.getId(),
      uuidv4(),
      new Date(),
    );
    await this.refreshTokenRepository.save(refreshTokenEnt);

    return AuthTokenHelper.generateAuthTokens(
      refreshTokenEnt,
      user,
      this.jwtService,
      this.refreshTokenRepository,
    );
  }
}
