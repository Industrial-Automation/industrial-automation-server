import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { CookieService } from '../common/services';
import { SERVER_RESPONSE_STATUS } from '../common/types';

@Controller('auth')
export class AuthController {
  @Inject(JwtService) private readonly jwtService: JwtService;
  @Inject(AuthService) private readonly authService: AuthService;
  @Inject(CookieService) private readonly cookieService: CookieService;

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const response = await this.authService.getMe(req);

    return response;
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const response = await this.authService.signUp(dto);

    return response;
  }

  @Post('sign-in')
  async signIn(@Res({ passthrough: true }) res: Response, @Body() dto: SignInDto) {
    const response = await this.authService.signIn(dto);

    if (!Object.keys(response.data).length) {
      return response;
    }

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
