import { ResetToken } from '../entities/reset-tokens.entity';

export const RESET_TOKEN_REPOSITORY = Symbol.for('ResetTokenRepository');
export interface ResetTokenRepository {
  findById(id: string): Promise<ResetToken | null>;
  save(resetToken: ResetToken): Promise<void>;
  update(resetToken: ResetToken): Promise<void>;
  delete(id: string): Promise<void>;
}
