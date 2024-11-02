import { Inject, Injectable } from '@nestjs/common';

import {
  CreateSchemaBulbDto,
  GetSchemaBulbsQueryDto,
  UpdateSchemaBulbDto
} from './schema-bulbs.dto';
import { SchemaBulb } from './types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { ProjectScreen } from '../project-screens/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class SchemaBulbsService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getSchemaBulbs(queryParams: GetSchemaBulbsQueryDto) {
    const schemaBulbs = await this.supabaseService.select<SchemaBulb[]>('schema_bulbs', '*', {
      ...queryParams
    });

    return {
      message: 'Get schema bulbs successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { schema_bulbs: schemaBulbs }
    };
  }

  async createSchemaBulb(dto: CreateSchemaBulbDto) {
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

    const createdSchemaBulb = await this.supabaseService.create<SchemaBulb>('schema_bulbs', {
      ...dto
    });

    return {
      message: 'Schema bulb created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        schema_bulb: createdSchemaBulb
      }
    };
  }

  async updateSchemaBulb(id: string, dto: UpdateSchemaBulbDto) {
    const data = await this.supabaseService.selectOne<Pick<SchemaBulb, 'id'> | null>(
      'schema_bulbs',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Schema bulb not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const schemaBulb = await this.supabaseService.update<SchemaBulb>(
      'schema_bulbs',
      { ...dto },
      { id }
    );

    return {
      message: 'Schema bulb updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { schema_bulb: schemaBulb }
    };
  }

  async deleteSchemaBulb(id: string) {
    const data = await this.supabaseService.selectOne<Pick<SchemaBulb, 'id'> | null>(
      'schema_bulbs',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Schema bulb not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('schema_bulbs', { id });

    return {
      message: 'Schema bulb deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { schema_bulb: { id } }
    };
  }
}
