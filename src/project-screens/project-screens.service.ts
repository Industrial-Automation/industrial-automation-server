import { Inject, Injectable } from '@nestjs/common';

import {
  CreateProjectScreenDto,
  GetProjectScreensQueryDto,
  UpdateProjectScreenDto
} from './project-screens.dto';
import { ProjectScreen } from './types';
import { Project } from '../projects/types';
import { UUIDService } from '../common/services';
import { SERVER_RESPONSE_STATUS } from '../common/types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProjectScreensService {
  @Inject(UUIDService) uuidService: UUIDService;
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
    const project = await this.supabaseService.selectOne<Pick<Project, 'id'> | null>(
      'projects',
      'id',
      { id: dto.project_id }
    );

    if (!project) {
      return {
        message: 'Project not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    const createdProjectScreen = await this.supabaseService.create<ProjectScreen>(
      'project_screens',
      { ...dto }
    );

    const projectScreens = await this.supabaseService.select<ProjectScreen[]>(
      'project_screens',
      '*',
      { project_id: dto.project_id }
    );

    const updatedProjectScreens = await Promise.all(
      projectScreens.map((projectScreen) =>
        projectScreen.order >= dto.order && createdProjectScreen.id !== projectScreen.id
          ? this.supabaseService.update(
              'project_screens',
              { order: projectScreen.order + 1 },
              { id: projectScreen.id }
            )
          : projectScreen
      )
    );

    return {
      message: 'Project screen created successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: {
        project_screens: updatedProjectScreens
      }
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
    const projectScreenForDelete = await this.supabaseService.selectOne<ProjectScreen | null>(
      'project_screens',
      '*',
      { id }
    );

    if (!projectScreenForDelete) {
      return {
        message: 'Project screen not found.',
        status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR,
        data: {}
      };
    }

    await this.supabaseService.delete('project_screens', { id });

    const projectScreens = await this.supabaseService.select<ProjectScreen[]>(
      'project_screens',
      '*',
      { project_id: projectScreenForDelete.project_id }
    );

    const updatedProjectScreens = await Promise.all(
      projectScreens.map((projectScreen) =>
        projectScreen.order > projectScreenForDelete.order
          ? this.supabaseService.update(
              'project_screens',
              { order: projectScreen.order - 1 },
              { id: projectScreen.id }
            )
          : projectScreen
      )
    );

    return {
      message: 'Project deleted successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project_screens: updatedProjectScreens }
    };
  }

  async uploadProjectScreen(id: string, file: Express.Multer.File) {
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

    const uploadedFile = await this.supabaseService.uploadFile(
      'project_screens_images',
      `${id}/${this.uuidService.generate()}_${file.originalname}`,
      file
    );

    const projectScreen = await this.supabaseService.update<ProjectScreen>(
      'project_screens',
      { schema_url: uploadedFile.fullPath },
      { id }
    );

    return {
      message: 'Image uploaded successfully.',
      status: SERVER_RESPONSE_STATUS.SUCCESS,
      data: { project_screen: projectScreen }
    };
  }
}
