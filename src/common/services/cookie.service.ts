import { CookieOptions } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface GetCookieOptionsParams {
  rememberMe: boolean;
}

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  getCookieOptions(params: GetCookieOptionsParams = { rememberMe: false }): CookieOptions {
    const getMaxAge = (): number => {
      const REMEMBER_ME_AGE = 1000 * 60 * 60 * 24 * 14; // 14 days
      const DO_NOT_REMEMBER_ME_AGE = 1000 * 60 * 60 * 6; // 6 hours

      return params.rememberMe ? REMEMBER_ME_AGE : DO_NOT_REMEMBER_ME_AGE;
    };

    const maxAge = getMaxAge();

    const options: CookieOptions = {
      maxAge,
      httpOnly: true
    };

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    if (['production'].includes(NODE_ENV)) {
      const origin = this.configService.get<string>('app.origin');

      const url = new URL(origin);
      const domain = url.hostname;

      options.domain = domain;
    }

    if (NODE_ENV === 'production') {
      options.secure = true;
    }

    return options;
  }

  getSignOutCookie(): CookieOptions {
    const options: CookieOptions = {
      maxAge: 1,
      httpOnly: true
    };

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    if (['production'].includes(NODE_ENV)) {
      const origin = this.configService.get<string>('app.origin');

      const url = new URL(origin);
      const domain = url.hostname;

      options.domain = domain;
    }

    if (NODE_ENV === 'production') {
      options.secure = true;
    }

    return options;
  }
}