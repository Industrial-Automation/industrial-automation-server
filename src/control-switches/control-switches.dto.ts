import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetControlSwitchesQueryDto {
  @IsOptional()
  @IsUUID()
  public screen_id?: string;
}

export class CreateControlSwitchDto {
  @IsUUID()
  public screen_id: string;

  @IsBoolean()
  public value: boolean;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  public description?: string;

  @IsBoolean()
  public editable: boolean;
}

export class UpdateControlSwitchDto {
  @IsOptional()
  @IsBoolean()
  public value?: boolean;

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
  @IsBoolean()
  public editable?: boolean;
}
