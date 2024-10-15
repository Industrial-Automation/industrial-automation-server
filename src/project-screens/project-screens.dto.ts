import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
