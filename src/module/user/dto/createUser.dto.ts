import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../common/constants';
import {
  IsString,
  IsEmail,
  ValidateNested,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
class Name {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;
}
export class CreateUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly roles: Role[];
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  @ValidateNested()
  @Type(() => Name)
  readonly name: Name;
}
