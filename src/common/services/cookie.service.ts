import { CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

interface GetCookieOptionsParams {
  rememberMe: boolean;
  isElectron: boolean;
}

@Injectable()
export class CookieService {
  @Inject(ConfigService) private readonly configService: ConfigService;

  getCookieOptions(
    params: GetCookieOptionsParams = { rememberMe: false, isElectron: false }
  ): CookieOptions {
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

    if (params.isElectron) {
      options.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
      options.sameSite = 'none';
      options.secure = true;
    }

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    if (['production'].includes(NODE_ENV)) {
      const origin = this.configService.get<string>('app.origin');

      const url = new URL(origin);
      const domain = url.hostname;

      options.domain = domain;
    }

    if (NODE_ENV === 'production') {
      options.secure = false; // todo test env
      options.sameSite = 'none'; // todo test env
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
