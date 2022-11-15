import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UtilsService } from '../../shared/providers/utils.service';
import { User } from '@sentry/node';
import { JwtService } from '@nestjs/jwt';

/**
 * This service contain contains all methods and business logic for authentication such as login etc.
 */
@Injectable()
export class AuthService {
  /**
   * @param userService from user.service
   * @param jwtService from auth.service
   */
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * it validates user email and password and returns the user object if it matches.
   * @param email user's email address.
   * @param pass user's password.
   * @returns user object if valid email and password otherwise null.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await (<User>this.userService.findOne({ email }));
    if (user && (await UtilsService.validateHash(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * it returns the access tokens for user authentication.
   * @param user user information from req object.
   * @returns token for authentication.
   */
  async login(user: User) {
    const payload = { sub: user._id, ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
