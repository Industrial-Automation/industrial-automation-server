import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService, SupabaseService, JwtService],
  exports: []
})
export class ProjectsModule {}
