import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ModuleModule } from './modules/module/module.module';
import * as express from 'express'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'addis_spare',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Set to false in production
        }),
        ModuleModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // enabling body parser except better auth endpoints
        consumer.apply(express.json()).exclude("api/auth/*path").forRoutes("*");
    }
}
