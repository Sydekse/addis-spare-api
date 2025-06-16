import { Module } from '@nestjs/common';
import { AuthController } from './interfaces/http/controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
})
export class AuthModule {}
