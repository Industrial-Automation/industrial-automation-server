import { Inject, Injectable } from '@nestjs/common';

import { ProjectScreen } from './types';
import { Project } from '../projects/types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProjectScreenDto, UpdateProjectScreenDto } from './project-screens.dto';

@Injectable()
export class ProjectScreensService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getProjectScreens(projectId: string) {
    const projectScreens = await this.supabaseService.select<ProjectScreen[]>(
      'project_screens',
      '*',
      { project_id: projectId }
    );

    return {
      message: 'Get project screens successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { projectScreens }
    };
  }

  async createProjectScreen(dto: CreateProjectScreenDto) {
    const data = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id: dto.project_id }
    );

    if (!data) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const projectScreen = await this.supabaseService.create<ProjectScreen>('project_screens', {
      ...dto
    });

    return {
      message: 'Project screen created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { projectScreen }
    };
  }

  async updateProjectScreen(id: string, dto: UpdateProjectScreenDto) {
    const data = await this.supabaseService.selectOne<Pick<ProjectScreen, 'id'> | null>(
      'project_screens',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Project screen not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const projectScreen = await this.supabaseService.update<ProjectScreen>(
      'project_screens',
      { ...dto },
      { id }
    );

    return {
      message: 'Project screen updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { projectScreen }
    };
  }

  async deleteProjectScreen(id: string) {
    const data = await this.supabaseService.selectOne<Pick<ProjectScreen, 'id'> | null>(
      'project_screen',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Project screen not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('project_screen', { id });

    return {
      message: 'Project deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project: {} }
    };
  }
}
