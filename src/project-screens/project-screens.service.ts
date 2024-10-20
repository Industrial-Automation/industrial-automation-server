import { Inject, Injectable } from '@nestjs/common';

import {
  CreateProjectScreenDto,
  GetProjectScreensQueryDto,
  UpdateProjectScreenDto
} from './project-screens.dto';
import { ProjectScreen } from './types';
import { Project } from '../projects/types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProjectScreensService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getProjectScreens(queryParams: GetProjectScreensQueryDto) {
    const projectScreens = await this.supabaseService.select<ProjectScreen[]>(
      'project_screens',
      '*',
      { ...queryParams }
    );

    return {
      message: 'Get project screens successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project_screens: projectScreens }
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
      data: { project_screen: projectScreen }
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
      data: { project_screen: projectScreen }
    };
  }

  async deleteProjectScreen(id: string) {
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

    await this.supabaseService.delete('project_screens', { id });

    return {
      message: 'Project deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project_screen: { id } }
    };
  }
}
