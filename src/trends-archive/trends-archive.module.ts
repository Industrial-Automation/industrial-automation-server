import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../supabase/supabase.service';
import { TrendsArchiveService } from './trends-archive.service';
import { TrendsArchiveController } from './trends-archive.controller';

@Module({
  imports: [],
  controllers: [TrendsArchiveController],
  providers: [TrendsArchiveService, SupabaseService, JwtService],
  exports: []
})
export class TrendsArchiveModule {}
