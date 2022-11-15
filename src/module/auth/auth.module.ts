import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passportStrategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passportStrategy/jwt.strategy';
import { ConfigService } from '../../shared/config/services/config.service';

/**
 * It is a feature module where we keep the controller, service and other code related to authentication and  we import other modules and configure modules and packages that are being used in this module.
 *
 * Here, feature modules imported are - UserModule.
 * other modules are :
 *      PassportModule - it enables us to setup multiple types of authentication.
 *      JwtModule - it is used for token creation for authentication.
 */
@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
