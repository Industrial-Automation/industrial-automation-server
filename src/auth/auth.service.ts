import { Inject, Injectable } from '@nestjs/common';

import { User } from './types';
import { SignInDto, SignUpDto } from './auth.dto';
import { BcryptService } from '../common/services';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  @Inject(BcryptService) private readonly bcryptService: BcryptService;
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async signUp(dto: SignUpDto) {
    const data = await this.supabaseService.selectOne<Pick<User, 'email'> | null>(
      'users',
      'email',
      { email: dto.email }
    );

    if (data && data.email) {
      return {
        message: 'Email already exists',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const hashedPassword = await this.bcryptService.hashData(dto.password);

    const createdUser = await this.supabaseService.create<User>('users', {
      ...dto,
      password: hashedPassword
    });

    const { id, email, phone, first_name, last_name, is_confirmed } = createdUser;

    return {
      message: 'User created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        user: {
          id,
          email,
          phone,
          first_name,
          last_name,
          is_confirmed
        }
      }
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.supabaseService.selectOne<User | null>('users', '*', {
      email: dto.email
    });

    if (!user) {
      return {
        message: 'Invalid email or password',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const isPasswordValid = await this.bcryptService.compareData(dto.password, user.password);

    if (!isPasswordValid) {
      return {
        message: 'Invalid password',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const { id, email, phone, first_name, last_name, is_confirmed } = user;

    return {
      message: 'User logged in successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        user: {
          id,
          email,
          phone,
          first_name,
          last_name,
          is_confirmed
        }
      }
    };
  }
}
