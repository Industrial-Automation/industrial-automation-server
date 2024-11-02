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
  CreateSchemaInputDto,
  GetSchemaInputsQueryDto,
  UpdateSchemaInputDto
} from './schema-inputs.dto';
import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { SchemaInputsService } from './schema-inputs.service';

@Controller('schema-inputs')
export class SchemaInputsController {
  @Inject(SchemaInputsService) private readonly schemaInputsService: SchemaInputsService;

  @UseGuards(AuthGuard)
  @Get('')
  async getSchemaInputs(@Query() queryParams: GetSchemaInputsQueryDto) {
    const response = await this.schemaInputsService.getSchemaInputs(queryParams);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createSchemaInput(@Body() dto: CreateSchemaInputDto) {
    const response = await this.schemaInputsService.createSchemaInput(dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateSchemaInput(@Param() { id }: IDParamDto, @Body() dto: UpdateSchemaInputDto) {
    const response = await this.schemaInputsService.updateSchemaInput(id, dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSchemaInput(@Param() { id }: IDParamDto) {
    const response = await this.schemaInputsService.deleteSchemaInput(id);

    return response;
  }
}
