import { IsOptional, IsUUID } from 'class-validator';

export class GetTrendsArchiveQueryDto {
  @IsOptional()
  @IsUUID()
  public screen_id?: string;
}
