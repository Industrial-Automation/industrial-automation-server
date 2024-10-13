import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { CookieService } from '../common/services';
import { SERVER_RESPONSE_STATUS } from '../common/types';

@Controller('auth')
export class AuthController {
  @Inject(JwtService) private readonly jwtService: JwtService;
  @Inject(AuthService) private readonly authService: AuthService;
  @Inject(CookieService) private readonly cookieService: CookieService;

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const response = await this.authService.signUp(dto);

    return response;
  }

  @Post('sign-in')
  async signIn(@Res({ passthrough: true }) res: Response, @Body() dto: SignInDto) {
    const response = await this.authService.signIn(dto);

    const options = this.cookieService.getCookieOptions({
      rememberMe: dto.rememberMe
    });

    const accessToken = this.jwtService.sign(response.data.user);

    res.cookie('accessToken', accessToken, options);

    return response;
  }

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
