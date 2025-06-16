import { All, Controller, Req, Res } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { IncomingMessage, ServerResponse } from 'http';
import { auth } from '../../../auth';

@Controller('api/auth/*pages')
export class AuthController {
  @All()
  handleAuth(
    @Req() req: IncomingMessage,
    @Res({ passthrough: true }) res: ServerResponse,
  ): Promise<void> {
    return toNodeHandler(auth)(req, res);
  }
}
