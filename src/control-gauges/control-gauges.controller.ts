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
  CreateControlGaugeDto,
  GetControlGaugesQueryDto,
  UpdateControlGaugeDto
} from './control-gauges.dto';
import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { ControlGaugesService } from './control-gauges.service';

@Controller('control-gauges')
export class ControlGaugesController {
  @Inject(ControlGaugesService) private readonly controlGaugesService: ControlGaugesService;

  @UseGuards(AuthGuard)
  @Get('')
  async getControlGauges(@Query() queryParams: GetControlGaugesQueryDto) {
    const response = await this.controlGaugesService.getControlGauges(queryParams);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createControlGauge(@Body() dto: CreateControlGaugeDto) {
    const response = await this.controlGaugesService.createControlGauge(dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateControlGauge(@Param() { id }: IDParamDto, @Body() dto: UpdateControlGaugeDto) {
    const response = await this.controlGaugesService.updateControlGauge(id, dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteControlGauge(@Param() { id }: IDParamDto) {
    const response = await this.controlGaugesService.deleteControlGauge(id);

    return response;
  }
}
