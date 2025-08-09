import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtTokenService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    NestJwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtTokenService, JwtStrategy],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
