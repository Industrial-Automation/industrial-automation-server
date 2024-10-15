import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';

import {
  CreateProjectScreenDto,
  GetProjectScreensQueryDto,
  UpdateProjectScreenDto
} from './project-screens.dto';
import { IDParamDto } from '../common/dto';
import { ProjectScreensService } from './project-screens.service';

@Controller('project-screens')
export class ProjectScreensController {
  @Inject(ProjectScreensService) private readonly projectScreensService: ProjectScreensService;

  @Get('')
  async getProjectScreens(@Query() queryParams: GetProjectScreensQueryDto) {
    const response = await this.projectScreensService.getProjectScreens(queryParams);

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
