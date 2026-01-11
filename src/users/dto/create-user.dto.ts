import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  is_patient: boolean;
}
