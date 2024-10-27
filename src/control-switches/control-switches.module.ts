import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../supabase/supabase.service';
import { ControlSwitchesService } from './control-switches.service';
import { ControlSwitchesController } from './control-switches.controller';

@Module({
  imports: [],
  controllers: [ControlSwitchesController],
  providers: [ControlSwitchesService, SupabaseService, JwtService],
  exports: []
})
export class ControlSwitchesModule {}
