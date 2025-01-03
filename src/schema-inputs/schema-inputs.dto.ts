import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetSchemaInputsQueryDto {
  @IsOptional()
  @IsUUID()
  public screen_id?: string;
}

export class CreateSchemaInputDto {
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

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public unit: string;

  @IsNumber()
  public width: number;

  @IsNumber()
  public height: string;

  @IsNumber()
  public x: number;

  @IsNumber()
  public y: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public tag: string;
}

export class UpdateSchemaInputDto {
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
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public unit?: string;

  @IsOptional()
  @IsNumber()
  public width?: number;

  @IsOptional()
  @IsNumber()
  public height?: number;

  @IsOptional()
  @IsNumber()
  public x?: number;

  @IsOptional()
  @IsNumber()
  public y?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public tag?: string;
}
