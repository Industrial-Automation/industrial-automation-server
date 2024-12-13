import { Inject, Injectable } from '@nestjs/common';

import {
  CreateSchemaInputDto,
  GetSchemaInputsQueryDto,
  UpdateSchemaInputDto
} from './schema-inputs.dto';
import { SchemaInput, TrendsArchive } from './types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { ProjectScreen } from '../project-screens/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class SchemaInputsService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getSchemaInputs(queryParams: GetSchemaInputsQueryDto) {
    const schemaInputs = await this.supabaseService.select<SchemaInput[]>('schema_inputs', '*', {
      ...queryParams
    });

    return {
      message: 'Get schema inputs successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { schema_inputs: schemaInputs }
    };
  }

  async createSchemaInput(dto: CreateSchemaInputDto) {
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

    const createdSchemaInput = await this.supabaseService.create<SchemaInput>('schema_inputs', {
      ...dto
    });

    return {
      message: 'Schema input created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        schema_input: createdSchemaInput
      }
    };
  }

  async updateSchemaInput(id: string, dto: UpdateSchemaInputDto) {
    const data = await this.supabaseService.selectOne<Pick<SchemaInput, 'id'> | null>(
      'schema_inputs',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Schema input not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const schemaInput = await this.supabaseService.update<SchemaInput>(
      'schema_inputs',
      { ...dto },
      { id }
    );

    if (dto.value) {
      await this.supabaseService.create<TrendsArchive>('trends_archive', {
        screen_id: schemaInput.screen_id,
        title: schemaInput.title,
        value: schemaInput.value,
        tag: schemaInput.tag
      });
    }

    return {
      message: 'Schema input updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { schema_input: schemaInput }
    };
  }

  async deleteSchemaInput(id: string) {
    const data = await this.supabaseService.selectOne<Pick<SchemaInput, 'id'> | null>(
      'schema_inputs',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Schema input not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('schema_inputs', { id });

    return {
      message: 'Schema input deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { schema_input: { id } }
    };
  }
}
