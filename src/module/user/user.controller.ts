import { Controller, Request, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/createUser.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from './../../shared/pipe/validation.pipe';
import { SkipAuth } from '../../shared/decorators/skipAuth.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { User } from './schemas/user.schema';

/**
 * UserController is responsible for handling incoming requests specific to User and returning responses to the client.
 * It creates a route - "/user"
 */
@Controller('user')
@ApiTags('USER')
export class UserController {
  /**
   * @param userService from user.service
   */
  constructor(public readonly userService: UserService) {}

  /**
   * Get API - "/" - finds all the users.
   * @returns array of users.
   */
  @Get()
  @ApiOperation({
    description: 'Api to fetch all registered users.',
    summary: 'Api to fetch all registered users.',
  })
  @ApiOkResponse({description: "Fetch all users from User database", type: [User]})
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Post API - "/signUp" - creates a new user in the database.
   * @param userDto user details.
   * @returns newly created user object.
   */
  @SkipAuth()
  @Post('signUp')
  @ApiOperation({
    description: 'Api to create new user.',
    summary:
      'Api to create new user. It takes (email, username, roles and password) as input',
  })
  @ApiOkResponse({
    description: 'User Data',
    type: User
  })
  createUser(@Body(new ValidationPipe()) userDto: CreateUser) {
    return this.userService.createUser(userDto);
  }

  /**
   * Get API - "/profile" - Get data about current logged in user
   * @param req Http request object.
   * @returns returns the user object.
   * @throws UnauthorizedException with message in case user is not logged in.
   */
  @Get('profile')
  @Roles(Role.USER, Role.ADMIN)
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
