import { Response } from 'express';
import { Controller, Post, Res } from '@nestjs/common';

import { CookieService } from '../../common/services';
import { SERVER_RESPONSE_STATUS } from '../../common/types';

@Controller('auth/sign-out')
export class SignOutController {
  constructor(private readonly cookieService: CookieService) {}

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('accessToken', '', this.cookieService.getSignOutCookie());

    return {
      message: 'Signed out successfully',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {}
    };
  }
}
