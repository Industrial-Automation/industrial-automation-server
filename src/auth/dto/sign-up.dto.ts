import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public last_name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  @Transform(({ value }) => value.trim())
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public password: string;
}
