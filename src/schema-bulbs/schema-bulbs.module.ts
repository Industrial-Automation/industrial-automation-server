import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../supabase/supabase.service';
import { SchemaBulbsService } from './schema-bulbs.service';
import { SchemaBulbsController } from './schema-bulbs.controller';

@Module({
  imports: [],
  controllers: [SchemaBulbsController],
  providers: [SchemaBulbsService, SupabaseService, JwtService],
  exports: []
})
export class SchemaBulbsModule {}
