import { User } from 'src/modules/users/domain/entity/user.entity';

export type AuthTokenResponse = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export type AccessTokenResponse = {
  accessToken: string;
};
