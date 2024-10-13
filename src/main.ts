import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  app.useGlobalPipes(CustomValidationPipe);

  const configService = app.get<ConfigService>(ConfigService);

  const origin = configService.get<string>('frontend.origin');

  app.enableCors({
    origin,
    credentials: true
  });

  app.setGlobalPrefix('/api');
  app.use(cookieParser());

  const port = configService.get<number>('app.port');

  await app.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Running app on port: ${port}`);
}

bootstrap();
