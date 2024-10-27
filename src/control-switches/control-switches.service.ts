import { Inject, Injectable } from '@nestjs/common';

import {
  CreateControlSwitchDto,
  GetControlSwitchesQueryDto,
  UpdateControlSwitchDto
} from './control-switches.dto';
import { ControlSwitch } from './types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { ProjectScreen } from '../project-screens/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ControlSwitchesService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getControlSwitches(queryParams: GetControlSwitchesQueryDto) {
    const controlSwitches = await this.supabaseService.select<ControlSwitch[]>(
      'control_switches',
      '*',
      { ...queryParams }
    );

    return {
      message: 'Get control switches successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { control_switches: controlSwitches }
    };
  }

  async createControlSwitch(dto: CreateControlSwitchDto) {
    const screen = await this.supabaseService.selectOne<Pick<ProjectScreen, 'id'> | null>(
      'project_screens',
      'id',
      { id: dto.screen_id }
    );

    if (!screen) {
      return {
        message: 'Screen not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const createdControlSwitch = await this.supabaseService.create<ControlSwitch>(
      'control_switches',
      { ...dto }
    );

    return {
      message: 'Control switch created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        control_switch: createdControlSwitch
      }
    };
  }

  async updateControlSwitch(id: string, dto: UpdateControlSwitchDto) {
    const data = await this.supabaseService.selectOne<Pick<ControlSwitch, 'id'> | null>(
      'control_switches',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Control switch not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const controlSwitch = await this.supabaseService.update<ControlSwitch>(
      'control_switches',
      { ...dto },
      { id }
    );

    return {
      message: 'Control switch updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { control_switch: controlSwitch }
    };
  }

  async deleteControlSwitch(id: string) {
    const data = await this.supabaseService.selectOne<Pick<ControlSwitch, 'id'> | null>(
      'control_switches',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Control switch not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('control_switches', { id });

    return {
      message: 'Control switch deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { control_switch: { id } }
    };
  }
}
