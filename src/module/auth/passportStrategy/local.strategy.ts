import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * Passport strategy for local credentials based authentication.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @param authService from auth.service
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   *  validates user email and password for authentication.
   * @param email user's email address.
   * @param password user's password.
   * @returns user object containg user information.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user._doc;
  }
}
