import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UUIDService } from '../common/services';
import { SupabaseService } from '../supabase/supabase.service';
import { ProjectScreensService } from './project-screens.service';
import { ProjectScreensController } from './project-screens.controller';

@Module({
  imports: [],
  controllers: [ProjectScreensController],
  providers: [ProjectScreensService, SupabaseService, JwtService, UUIDService],
  exports: []
})
export class ProjectScreensModule {}
