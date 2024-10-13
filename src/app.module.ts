import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configuration, validationSchema } from './config';

const envFilePath = `${process.cwd()}/.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [configuration],
      validationSchema
    }),
    AuthModule
  ],
  providers: [AppService]
})
export class AppModule {}
