import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configuration, validationSchema } from './config';
import { ProjectsModule } from './projects/projects.module';
import { ProjectTagsModule } from './project-tags/project-tags.module';
import { SchemaBulbsModule } from './schema-bulbs/schema-bulbs.module';
import { SchemaInputsModule } from './schema-inputs/schema-inputs.module';
import { TrendsArchiveModule } from './trends-archive/trends-archive.module';
import { ControlGaugesModule } from './control-gauges/control-gauges.module';
import { ProjectScreensModule } from './project-screens/project-screens.module';
import { ControlSwitchesModule } from './control-switches/control-switches.module';

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
    ProjectTagsModule,
    SchemaBulbsModule,
    SchemaInputsModule,
    TrendsArchiveModule,
    ControlGaugesModule,
    ProjectScreensModule,
    ControlSwitchesModule
  ],
  providers: [AppService]
})
export class AppModule {}
