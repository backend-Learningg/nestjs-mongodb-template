import { randomUUID } from 'crypto';
import { raw, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../common/constants';

export type UserDocument = User & Document;

/**
 * Schema interface for validation of User Document fields.
 */
@Schema()
export class User {
  /**
   * unique autogenerated id
   */
  @Prop({ default: () => randomUUID() })
  _id: string;

  /**
   * user's name
   */
  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  name: Record<string, any>;

  /**
   * user's email
   */
  @Prop({ required: true })
  email: string;

  /**
   * user's roles
   */
  @Prop({ required: true })
  roles: Role[];

  /**
   * user's password
   */
  @Prop({ required: true })
  password: string;

  /**
   * user's username
   */
  @Prop({ required: true })
  username: string;
}
/**
 * User Schema object
 */
export const UserSchema = SchemaFactory.createForClass(User);
