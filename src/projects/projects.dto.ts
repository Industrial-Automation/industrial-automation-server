import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public opc_url: string;

  @IsNumber()
  public opc_namespace_index: number;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public opc_url?: string;

  @IsOptional()
  @IsNumber()
  public opc_namespace_index?: number;
}
