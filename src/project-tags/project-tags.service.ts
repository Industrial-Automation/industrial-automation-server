import { Inject, Injectable } from '@nestjs/common';

import { Project } from '../projects/types';
import { UpdateTagDto } from './project-tags.dto';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { ProjectScreen } from '../project-screens/types';
import { SupabaseService } from '../supabase/supabase.service';
import { ReadableTagType, UpdatedTagType, WritableTagType } from './types';

@Injectable()
export class ProjectTagsService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getWritableTags(projectId: string) {
    const project = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id: projectId }
    );

    if (!project) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const screens = await this.supabaseService.select<ProjectScreen[]>('project_screens', '*', {
      project_id: projectId
    });

    const data = (
      await Promise.all(
        screens.flatMap((screen) => [
          this.supabaseService.select<WritableTagType[]>('control_gauges', 'tag, value', {
            screen_id: screen.id
          }),
          this.supabaseService.select<WritableTagType[]>('control_switches', 'tag, value', {
            screen_id: screen.id
          })
        ])
      )
    ).flat();

    return {
      message: 'Get writable tags successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { tags: data }
    };
  }

  async getReadableTags(projectId: string) {
    const project = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id: projectId }
    );

    if (!project) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const screens = await this.supabaseService.select<ProjectScreen[]>('project_screens', '*', {
      project_id: projectId
    });

    const data = (
      await Promise.all(
        screens.map(async (screen) =>
          [
            (
              await this.supabaseService.select('control_gauges', 'id, tag', {
                screen_id: screen.id
              })
            ).map((control_gauge) => ({
              ...control_gauge,
              table: 'control_gauges'
            })) as ReadableTagType[],
            (
              await this.supabaseService.select('control_switches', 'id, tag', {
                screen_id: screen.id
              })
            ).map((control_switch) => ({
              ...control_switch,
              table: 'control_switches'
            })) as ReadableTagType[],
            (
              await this.supabaseService.select('schema_bulbs', 'id, tag', {
                screen_id: screen.id
              })
            ).map((schema_bulb) => ({
              ...schema_bulb,
              table: 'schema_bulbs'
            })) as ReadableTagType[],
            (
              await this.supabaseService.select('schema_inputs', 'id, tag', {
                screen_id: screen.id
              })
            ).map((schema_input) => ({
              ...schema_input,
              table: 'schema_inputs'
            })) as ReadableTagType[]
          ].flat()
        )
      )
    ).flat();

    return {
      message: 'Get readable tags successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { tags: data }
    };
  }

  async updateTagElement(projectId: string, dto: UpdateTagDto) {
    const project = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id: projectId }
    );

    if (!project) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const tagElement = (await this.supabaseService.update(
      dto.table,
      { value: dto.value },
      { id: dto.id }
    )) as Partial<UpdatedTagType>;

    return {
      message: 'Tag element updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        tag: {
          id: tagElement.id,
          tag: tagElement.tag,
          value: tagElement.value,
          table: dto.table
        }
      }
    };
  }
}
