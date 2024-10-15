import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configuration, validationSchema } from './config';
import { ProjectsModule } from './projects/projects.module';
import { ProjectScreensModule } from './project-screens/project-screens.module';

const envFilePath = `${process.cwd()}/.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [configuration],
      validationSchema
    }),
    AuthModule,
    ProjectsModule,
    ProjectScreensModule
  ],
  providers: [AppService]
})
export class AppModule {}
