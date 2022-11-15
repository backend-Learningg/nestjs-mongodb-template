import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UtilsService } from './../../shared/providers/utils.service';

/**
 * This service contain contains methods and business logic related to user.
 */
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * finds all the users in the database.
   * @returns all the users in the database.
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * finds the user using the given query.
   * @returns the user matchting the query, if no user matches then returns null.
   */
  findOne(query): Promise<User | null | undefined> {
    return this.userModel.findOne(query).exec();
  }

  /**
   * creates a user object with given details in the database
   * @param user user information.
   * @returns newly created user object.
   */
  async createUser(user): Promise<User | undefined> {
    user.password = UtilsService.generateHash(user.password);
    const newUser = await new this.userModel({ ...user });
    return newUser.save();
  }
}
