import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../shared/gaurds/local-auth.guard';
import { AuthService } from './auth.service';
import { SkipAuth } from '../../shared/decorators/skipAuth.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../common/constants';
import { UserLoginDto } from './dto/UserLoginDto';
import { CreateUser } from '../user/dto/createUser.dto';

/**
 * AuthController is responsible for handling incoming requests specific to Authentication related APIs and returning responses to the client.
 * it creates a route - "/auth"
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  /**
   *
   * @param authService from auth.service
   */
  constructor(public readonly authService: AuthService) {}

  /**
   * POST API - "/login" - used for logging in the user.
   * @param req HTTP request object.
   * @returns token for authentication.
   */
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    description: 'Api to create new user.',
    summary:
      'Api to create new user. It takes (email, username, roles and password) as input',
  })
  @ApiOkResponse({
    description: 'User Data',
  })
  async login(@Request() req: UserLoginDto) {
    return this.authService.login(req);
  }

  /**
   * Get API - "/profile" - Get data about current logged in user
   * it requires authentication.
   * @param req Http request object.
   * @returns returns the user object.
   * @throws UnauthorizedException with message in case user is not logged in.
   */
  @Get('profile')
  @Roles(Role.ADMIN)
  @ApiOperation({
    description: 'Api to create new user.',
    summary:
      'Api to create new user. It takes (email, username, roles and password) as input',
  })
  @ApiOkResponse({
    description: "Return Logged In User's Information",
    type: CreateUser,
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
