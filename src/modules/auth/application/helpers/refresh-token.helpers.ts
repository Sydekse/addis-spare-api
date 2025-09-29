import { AuthTokenResponse } from '../dto/auth-token.response.dto';
import { RefreshToken } from '../../domain/entities/refresh-tokens.entity';
import { RefreshTokenRepository } from '../../domain/repositories/refresh-token.repository';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/modules/users/domain/entity/user.entity';
import { BcryptHelper } from './bcrypt.helpers';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';

export class AuthTokenHelper {
  static async generateAuthTokens(
    refToken: RefreshToken,
    user: User,
    jwtService: JwtTokenService,
    refTokenRepo: RefreshTokenRepository,
  ): Promise<AuthTokenResponse> {
    const newToken = uuidv4();
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    refToken.update(
      refToken.getUserId(),
      await BcryptHelper.hash(newToken),
      expiryDate,
    );
    await refTokenRepo.update(refToken);

    const accessToken = await jwtService.sign({
      sub: user.getId(),
      email: user.getEmail(),
    });
    const refreshToken = BcryptHelper.encodeb64(
      refToken.getId() + ':' + newToken,
    );
    return { accessToken, refreshToken, user };
  }
}
