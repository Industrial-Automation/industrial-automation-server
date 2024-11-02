import { IsUUID } from 'class-validator';

export class IDParamDto {
  @IsUUID()
  public id: string;
}
