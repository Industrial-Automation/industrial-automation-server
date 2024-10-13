import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { configuration, validationSchema } from './config';

const envFilePath = `${process.cwd()}/.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [configuration],
      validationSchema
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
