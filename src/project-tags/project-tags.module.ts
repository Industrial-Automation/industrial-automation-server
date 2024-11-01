import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../supabase/supabase.service';
import { ProjectTagsService } from './project-tags.service';
import { ProjectTagsController } from './project-tags.controller';

@Module({
  imports: [],
  controllers: [ProjectTagsController],
  providers: [ProjectTagsService, SupabaseService, JwtService],
  exports: []
})
export class ProjectTagsModule {}
