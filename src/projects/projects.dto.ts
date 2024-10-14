import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public name: string;
}

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public name: string;
}
