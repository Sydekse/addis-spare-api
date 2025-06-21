import { RefreshToken } from '../entities/refresh-tokens.entity';

export const REFRESH_TOKEN_REPOSITORY = Symbol.for('RefreshTokenRepository');
export interface RefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | null>;
  findByUserId(userId: string): Promise<RefreshToken>;
  save(refreshToken: RefreshToken): Promise<void>;
  update(refreshToken: RefreshToken): Promise<void>;
  delete(id: string): Promise<void>;
}
