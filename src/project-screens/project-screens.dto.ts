import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetProjectScreensQueryDto {
  @IsOptional()
  @IsUUID()
  public project_id?: string;
}

export class CreateProjectScreenDto {
  @IsUUID()
  public project_id: string;

  @IsNumber()
  @IsInt()
  public order: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public name: string;
}

export class UpdateProjectScreenDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public name: string;
}
