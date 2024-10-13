import { Module } from '@nestjs/common';

import { SignUpService } from './services';
import { SupabaseService } from '../supabase';
import { BcryptService, CookieService } from '../common/services';
import { SignOutController, SignUpController } from './controllers';

@Module({
  imports: [],
  controllers: [SignUpController, SignOutController],
  providers: [SignUpService, BcryptService, SupabaseService, CookieService],
  exports: []
})
export class AuthModule {}
