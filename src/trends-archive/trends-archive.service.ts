import { Inject, Injectable } from '@nestjs/common';

import { TrendsArchive } from './types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { SupabaseService } from '../supabase/supabase.service';
import { GetTrendsArchiveQueryDto } from './trends-archive.dto';

@Injectable()
export class TrendsArchiveService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getTrendsArchive(queryParams: GetTrendsArchiveQueryDto) {
    const trendsArchive = await this.supabaseService.select<TrendsArchive[]>(
      'trends_archive',
      '*',
      { ...queryParams }
    );

    return {
      message: 'Get trends archive successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { trends_archive: trendsArchive }
    };
  }
}
