import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  const configService = app.get<ConfigService>(ConfigService);

  const origin = configService.get<string>('frontend.origin');
  const port = configService.get<number>('app.port');

  app.enableCors({
    origin,
    credentials: true
  });

  app.setGlobalPrefix('/api');
  app.use(cookieParser());

  if (port) {
    await app.listen(port);

    // eslint-disable-next-line no-console
    console.log(`Running app on port: ${port}`);
  }
}

bootstrap();
