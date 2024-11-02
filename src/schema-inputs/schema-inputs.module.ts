import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../supabase/supabase.service';
import { SchemaInputsService } from './schema-inputs.service';
import { SchemaInputsController } from './schema-inputs.controller';

@Module({
  imports: [],
  controllers: [SchemaInputsController],
  providers: [SchemaInputsService, SupabaseService, JwtService],
  exports: []
})
export class SchemaInputsModule {}
