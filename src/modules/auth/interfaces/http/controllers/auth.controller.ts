import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Inject,
  UsePipes,
  ValidationPipe,
  Query,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthTokenResponse } from 'src/modules/auth/application/dto/auth-token.response.dto';
import { RefreshTokenDto } from 'src/modules/auth/application/dto/refresh-token.dto';
import { ResetPasswordDto } from 'src/modules/auth/application/dto/reset-password.dto';
import { SignInDto } from 'src/modules/auth/application/dto/sign-in.dto';
import { SignUpDto } from 'src/modules/auth/application/dto/sign-up.dto';
import { CookieHelper } from 'src/modules/auth/application/helpers/cookie.helpers';
import { ForgetPasswordUseCase } from 'src/modules/auth/application/use-cases/forget-password.use-case';
import { RefreshTokenUseCase } from 'src/modules/auth/application/use-cases/refresh-token.use-case';
import { ResetPasswordUseCase } from 'src/modules/auth/application/use-cases/reset-password.use-case';
import { SignInWithGoogleUseCase } from 'src/modules/auth/application/use-cases/sign-in-google.use-case';
import { SignInUseCase } from 'src/modules/auth/application/use-cases/sign-in.use-case';
import { SignUpUseCase } from 'src/modules/auth/application/use-cases/sign-up.use-case';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { User } from 'src/modules/users/domain/entity/user.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { Response } from 'express';
import { ForgetPasswordDto } from 'src/modules/auth/application/dto/forget-password.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly forgetPasswordUseCase: ForgetPasswordUseCase,
    private readonly signInWithGoogleUseCase: SignInWithGoogleUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post('signup')
  async signup(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokenResponse> {
    const authToken = await this.signUpUseCase.execute(dto);
    CookieHelper.setRefreshToken(res, authToken.refreshToken);
    return authToken;
  }

  @Post('signin')
  async signin(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokenResponse> {
    const authToken = await this.signInUseCase.execute(dto);
    CookieHelper.setRefreshToken(res, authToken.refreshToken);
    return authToken;
  }

  @Post('forget-password')
  async generateResetToken(
    @Body() dto: ForgetPasswordDto,
  ): Promise<{ token: string; id: string }> {
    return this.forgetPasswordUseCase.execute(dto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @Query('id') id: string,
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokenResponse> {
    dto.tokenId = id;
    dto.token = token;
    const authToken = await this.resetPasswordUseCase.execute(dto);
    CookieHelper.setRefreshToken(res, authToken.refreshToken);
    return authToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getme(@Req() req): Promise<User | null> {
    const userId: string = req.user.userId || '';
    return this.userRepository.findById(userId);
  }

  @Get('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    CookieHelper.clearRefreshToken(res);
    return { message: 'Signed out' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Will redirect to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokenResponse> {
    const email: string = req.user.email || 'email';
    const authToken = await this.signInWithGoogleUseCase.execute(email);
    CookieHelper.setRefreshToken(res, authToken.refreshToken);
    return authToken;
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokenResponse> {
    const dto: string = req?.cookies['refreshToken'] || '';
    const authToken = await this.refreshTokenUseCase.execute(
      new RefreshTokenDto(dto),
    );
    CookieHelper.setRefreshToken(res, authToken.refreshToken);
    return authToken;
  }
}
