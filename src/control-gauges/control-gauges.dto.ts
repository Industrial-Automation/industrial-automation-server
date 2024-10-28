import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetControlGaugesQueryDto {
  @IsOptional()
  @IsUUID()
  public screen_id?: string;
}

export class CreateControlGaugeDto {
  @IsUUID()
  public screen_id: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  public description?: string;

  @IsNumber()
  public value: number;

  @IsNumber()
  public min_value: number;

  @IsNumber()
  public max_value: number;

  @IsNumber()
  public interval_value: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public unit: string;

  @IsBoolean()
  public editable: boolean;
}

export class UpdateControlGaugeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public title?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  public description?: string;

  @IsOptional()
  @IsNumber()
  public value?: number;

  @IsOptional()
  @IsNumber()
  public min_value?: number;

  @IsOptional()
  @IsNumber()
  public max_value?: number;

  @IsOptional()
  @IsNumber()
  public interval_value?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public unit?: string;

  @IsOptional()
  @IsBoolean()
  public editable?: boolean;
}
