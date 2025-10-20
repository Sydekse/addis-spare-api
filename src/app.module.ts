import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import roles from './modules/auth/infrastructure/access-control/access-control';
import { ModuleModule } from './modules/module/module.module';
import { ProductModule } from './modules/product/product.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrderModule } from './modules/order/order.module';
import { RatingModule } from './modules/rating/rating.module';
import { ReportModule } from './modules/report/report.module';
import { ValidationModule } from './modules/validation/validation.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageModule } from './modules/message/message.module';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from './modules/setting/settings.module';
import { ReviewsModule } from './modules/review/review.module';
import { PaymentsModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-eu-north-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.vrbbbgyrrznocxxagxvn',
      password: 'zoCy1IDPqAWohYvS',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Supabase requires SSL
      },
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'addis_spare',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   ssl: {
    //     rejectUnauthorized: false, // Supabase requires SSL
    //   },
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'postgres',
    //     host: config.get<string>('DB_HOST'),
    //     port: 5342,
    //     username: config.get<string>('DB_USERNAME'),
    //     password: config.get<string>('DB_PASSWORD'),
    //     database: config.get<string>('DB_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     ssl: { rejectUnauthorized: false }, // required for Supabase
    //   }),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ValidationModule,
    ModuleModule,
    PaymentsModule,
    MessageModule,
    InventoryModule,
    ProductModule,
    OrderModule,
    ReportModule,
    SettingsModule,
    RatingModule,
    UserModule,
    NotificationModule,
    ReviewsModule,
    AuthModule,
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
