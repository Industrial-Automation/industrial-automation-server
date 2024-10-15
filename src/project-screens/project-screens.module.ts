import { Module } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { ProjectScreensService } from './project-screens.service';
import { ProjectScreensController } from './project-screens.controller';

@Module({
  imports: [],
  controllers: [ProjectScreensController],
  providers: [ProjectScreensService, SupabaseService],
  exports: []
})
export class ProjectScreensModule {}
