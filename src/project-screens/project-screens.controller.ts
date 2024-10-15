import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';

import { IDParamDto } from '../common/dto';
import { ProjectScreensService } from './project-screens.service';
import { CreateProjectScreenDto, UpdateProjectScreenDto } from './project-screens.dto';

@Controller('project-screens')
export class ProjectScreensController {
  @Inject(ProjectScreensService) private readonly projectScreensService: ProjectScreensService;

  @Get(':id')
  async getProjectScreens({ id: projectId }: IDParamDto) {
    const response = await this.projectScreensService.getProjectScreens(projectId);

    return response;
  }

  @Post('')
  async createProjectScreen(@Body() dto: CreateProjectScreenDto) {
    const response = await this.projectScreensService.createProjectScreen(dto);

    return response;
  }

  @Patch(':id')
  async updateProjectScreen(@Param() { id }: IDParamDto, @Body() dto: UpdateProjectScreenDto) {
    const response = await this.projectScreensService.updateProjectScreen(id, dto);

    return response;
  }

  @Delete(':id')
  async deleteProjectScreen(@Param() { id }: IDParamDto) {
    const response = await this.projectScreensService.deleteProjectScreen(id);

    return response;
  }
}
