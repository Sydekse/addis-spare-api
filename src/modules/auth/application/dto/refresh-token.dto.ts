import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(tok: string) {
    this.refreshToken = tok;
  }

  static decode(refreshToken: string): { id: string; token: string } {
    const buffer = Buffer.from(refreshToken, 'base64').toString('utf-8');
    const [id, token] = buffer.split(':');
    return { id, token };
  }

  static encode(id: string, token: string): string {
    const buffer = id + ':' + token;
    const refreshToken = Buffer.from(buffer).toString('base64');
    return refreshToken;
  }
}
