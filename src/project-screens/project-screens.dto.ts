import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetProjectScreensQueryDto {
  @IsOptional()
  @IsUUID()
  public project_id?: string;
}

export class CreateProjectScreenDto {
  @IsUUID()
  public project_id: string;

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
