import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import {
  CreateSchemaBulbDto,
  GetSchemaBulbsQueryDto,
  UpdateSchemaBulbDto
} from './schema-bulbs.dto';
import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { SchemaBulbsService } from './schema-bulbs.service';

@Controller('schema-inputs')
export class SchemaBulbsController {
  @Inject(SchemaBulbsService) private readonly schemaBulbsService: SchemaBulbsService;

  @UseGuards(AuthGuard)
  @Get('')
  async getSchemaBulbs(@Query() queryParams: GetSchemaBulbsQueryDto) {
    const response = await this.schemaBulbsService.getSchemaBulbs(queryParams);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createSchemaBulb(@Body() dto: CreateSchemaBulbDto) {
    const response = await this.schemaBulbsService.createSchemaBulb(dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateSchemaBulb(@Param() { id }: IDParamDto, @Body() dto: UpdateSchemaBulbDto) {
    const response = await this.schemaBulbsService.updateSchemaBulb(id, dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSchemaBulb(@Param() { id }: IDParamDto) {
    const response = await this.schemaBulbsService.deleteSchemaBulb(id);

    return response;
  }
}
