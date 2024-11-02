import { Inject, Injectable } from '@nestjs/common';

import {
  CreateControlGaugeDto,
  GetControlGaugesQueryDto,
  UpdateControlGaugeDto
} from './control-gauges.dto';
import { ControlGauge } from './types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { ProjectScreen } from '../project-screens/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ControlGaugesService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getControlGauges(queryParams: GetControlGaugesQueryDto) {
    const controlGauges = await this.supabaseService.select<ControlGauge[]>('control_gauges', '*', {
      ...queryParams
    });

    return {
      message: 'Get control gauges successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { control_gauges: controlGauges }
    };
  }

  async createControlGauge(dto: CreateControlGaugeDto) {
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

    const createdControlGauge = await this.supabaseService.create<ControlGauge>('control_gauges', {
      ...dto
    });

    return {
      message: 'Control gauge created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        control_gauge: createdControlGauge
      }
    };
  }

  async updateControlGauge(id: string, dto: UpdateControlGaugeDto) {
    const data = await this.supabaseService.selectOne<Pick<ControlGauge, 'id'> | null>(
      'control_gauges',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Control gauge not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const controlGauge = await this.supabaseService.update<ControlGauge>(
      'control_gauges',
      { ...dto },
      { id }
    );

    return {
      message: 'Control gauge updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { control_gauge: controlGauge }
    };
  }

  async deleteControlGauge(id: string) {
    const data = await this.supabaseService.selectOne<Pick<ControlGauge, 'id'> | null>(
      'control_gauges',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Control gauge not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('control_gauges', { id });

    return {
      message: 'Control gauge deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { control_gauge: { id } }
    };
  }
}
