import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './shared/config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { SentryInterceptor } from './shared/interceptors/sentry-interceptor';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exceptionFilters/all-exception';
import { ThrottlerSettings } from './common/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/config/services/config.service';
import { UserModule } from './module/user/user.module';
import { UtilsService } from './shared/providers/utils.service';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './shared/gaurds/jwt-auth.guard';
import { RolesGuard } from './shared/gaurds/roles.guard';

/**
 * It is the root module for the application in we import all feature modules and configure modules and packages that are common in feature modules. Here we also configure the middlewares.
 * Here we also apply JWT app guards, interceptors, exception filters.
 * Here, feature modules imported are - AuthModule and UserModule.
 * other modules are :
 *      ConfigModule - enables us to access environment variables application wide.
 *      ThrottlerModule - enables us to rate limit the number of incoming requests.
 *      MongooseModule - it is an Object Data Modeling (ODM) library that enables easy access to mongoDB.
 */
@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot({
      ttl: ThrottlerSettings.TTL,
      limit: ThrottlerSettings.Limit,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    UtilsService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, //defining exception filter globally
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
