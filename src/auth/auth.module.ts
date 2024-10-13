import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { BcryptService, CookieService } from '../common/services';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, SupabaseService, CookieService],
  exports: []
})
export class AuthModule {}
