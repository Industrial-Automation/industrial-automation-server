import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { TrendsArchiveService } from './trends-archive.service';
import { GetTrendsArchiveQueryDto } from './trends-archive.dto';

@Controller('trends-archive')
export class TrendsArchiveController {
  @Inject(TrendsArchiveService) private readonly trendsArchiveService: TrendsArchiveService;

  @UseGuards(AuthGuard)
  @Get('')
  async getTrendsArchive(@Query() queryParams: GetTrendsArchiveQueryDto) {
    const response = await this.trendsArchiveService.getTrendsArchive(queryParams);

    return response;
  }
}
