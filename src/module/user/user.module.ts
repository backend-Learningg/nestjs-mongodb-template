import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

/**
 * It is a feature module where we keep the controller, service and other code related to user entity and  we import other modules and configure modules and packages that are being used in this module.
 *
 * Here modules are :
 *      MongooseModule - Here we register our user schema in the mongoose module.
 */
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // AuthModule
  ],
  exports: [UserService],
})
export class UserModule {}
