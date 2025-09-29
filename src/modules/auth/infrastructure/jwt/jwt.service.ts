import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: { sub: string; email: string }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
