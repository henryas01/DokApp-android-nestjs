import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsIn,
  Matches,
} from 'class-validator';

export class CreateBookAppointmentDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number; // user_id: number;

  @IsInt()
  @IsNotEmpty()
  age: number; // age: number;

  @IsInt()
  @IsNotEmpty()
  doctor_id: number;

  @IsString()
  @Length(1, 2)
  @IsNotEmpty()
  month: string;

  @IsString()
  @Length(1, 2)
  @IsNotEmpty()
  date: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/)
  time: string;

  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @IsInt()
  @IsIn([0, 1])
  gender: number;

  @IsString()
  @IsOptional()
  phone_number?: string; // phone_number: string;

  @IsString()
  @IsOptional()
  symptoms?: string;

  @IsInt()
  @IsOptional()
  @IsIn([0, 1])
  status?: number; // 0 = pending, 1 = approved
}
