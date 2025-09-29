import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './interfaces/http/controllers/auth.controller';
import { ResetTokenTypeOrmEntity } from './infrastructure/persistence/typeorm/reset-token-typeorm.entity';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { UserModule } from '../users/user.module';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { JwtTokenModule } from './infrastructure/jwt/jwt.module';
import { RESET_TOKEN_REPOSITORY } from './domain/repositories/reset-token.repository';
import { ResetTokenTypeOrmRepository } from './infrastructure/persistence/repositories/reset-token-typeorm.repository';
import { ForgetPasswordUseCase } from './application/use-cases/forget-password.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { GoogleStrategy } from './infrastructure/social-providers/google.strategy';
import { SignInWithGoogleUseCase } from './application/use-cases/sign-in-google.use-case';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';
import { REFRESH_TOKEN_REPOSITORY } from './domain/repositories/refresh-token.repository';
import { RefreshTokenTypeOrmEntity } from './infrastructure/persistence/typeorm/refresh-token-typeorm.entity';
import { RefreshTokenTypeOrmRepository } from './infrastructure/persistence/repositories/refresh-token-typeorm.repository';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResetTokenTypeOrmEntity]),
    TypeOrmModule.forFeature([RefreshTokenTypeOrmEntity]),
    UserModule,
    JwtTokenModule,
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [
    SignUpUseCase,
    SignInUseCase,
    ForgetPasswordUseCase,
    RefreshTokenUseCase,
    SignInWithGoogleUseCase,
    ResetPasswordUseCase,
    GoogleStrategy,
    {
      provide: RESET_TOKEN_REPOSITORY,
      useClass: ResetTokenTypeOrmRepository,
    },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: RefreshTokenTypeOrmRepository,
    },
  ],
  exports: [RESET_TOKEN_REPOSITORY, REFRESH_TOKEN_REPOSITORY],
})
export class AuthModule {}
