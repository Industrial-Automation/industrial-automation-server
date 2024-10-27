import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../supabase/supabase.service';
import { ControlGaugesService } from './control-gauges.service';
import { ControlGaugesController } from './control-gauges.controller';

@Module({
  imports: [],
  controllers: [ControlGaugesController],
  providers: [ControlGaugesService, SupabaseService, JwtService],
  exports: []
})
export class ControlGaugesModule {}
