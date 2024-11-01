import { Inject, Injectable } from '@nestjs/common';

import { WritableTagType } from './types';
import { Project } from '../projects/types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { ProjectScreen } from '../project-screens/types';
import { SupabaseService } from '../supabase/supabase.service';

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
}
