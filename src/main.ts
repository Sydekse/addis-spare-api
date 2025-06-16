import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false, // better auth requires this("https://www.better-auth.com/docs/integrations/express")
    });

    app.enableCors({
        origin: process.env?.FRONTEND_URL || "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
