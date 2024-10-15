import { Inject, Injectable } from '@nestjs/common';

import { Project } from './types';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';

@Injectable()
export class ProjectsService {
  @Inject(SupabaseService) private readonly supabaseService: SupabaseService;

  async getProjects() {
    const projects = await this.supabaseService.select<Project[]>('projects', '*');

    return {
      message: 'Get projects successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { projects }
    };
  }

  async createProject(dto: CreateProjectDto) {
    const project = await this.supabaseService.create<Project>('projects', { ...dto });

    return {
      message: 'Project created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project }
    };
  }

  async updateProject(id: string, dto: UpdateProjectDto) {
    const data = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const project = await this.supabaseService.update<Project>('projects', { ...dto }, { id });

    return {
      message: 'Project updated successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project }
    };
  }

  async deleteProject(id: string) {
    const data = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id }
    );

    if (!data) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('projects', { id });

    return {
      message: 'Project deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project: {} }
    };
  }
}
