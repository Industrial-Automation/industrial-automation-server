import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { IsNumberOrBoolean } from '../common/decorators';

export class UpdateTagDto {
  @IsUUID()
  public id: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  public table: string;

  @IsNumberOrBoolean()
  public value: string;
}
