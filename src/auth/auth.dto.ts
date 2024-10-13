import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public password: string;

  @IsOptional()
  @IsBoolean()
  public rememberMe?: boolean;
}

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
