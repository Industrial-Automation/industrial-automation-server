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
  CreateControlSwitchDto,
  GetControlSwitchesQueryDto,
  UpdateControlSwitchDto
} from './control-switches.dto';
import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { ControlSwitchesService } from './control-switches.service';

@Controller('control-switches')
export class ControlSwitchesController {
  @Inject(ControlSwitchesService) private readonly controlSwitchesService: ControlSwitchesService;

  @UseGuards(AuthGuard)
  @Get('')
  async getControlSwitches(@Query() queryParams: GetControlSwitchesQueryDto) {
    const response = await this.controlSwitchesService.getControlSwitches(queryParams);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createControlSwitch(@Body() dto: CreateControlSwitchDto) {
    const response = await this.controlSwitchesService.createControlSwitch(dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateControlSwitch(@Param() { id }: IDParamDto, @Body() dto: UpdateControlSwitchDto) {
    const response = await this.controlSwitchesService.updateControlSwitch(id, dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteControlSwitch(@Param() { id }: IDParamDto) {
    const response = await this.controlSwitchesService.deleteControlSwitch(id);

    return response;
  }
}
