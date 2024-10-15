import { Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService, SupabaseService],
  exports: []
})
export class ProjectsModule {}