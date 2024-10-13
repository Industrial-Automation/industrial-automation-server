import { Inject, Injectable } from '@nestjs/common';

import { User } from '../types';
import { SignUpDto } from '../dto';
import { SupabaseService } from '../../supabase';
import { BcryptService } from '../../common/services';
import { SERVER_RESPONSE_STATUS } from '../../common/types';

@Injectable()
export class SignUpService {
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
      message: 'Sent verification email successfully.',
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
