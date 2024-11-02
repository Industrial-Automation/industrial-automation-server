import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';

import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProjectDto } from './projects.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  @Inject(ProjectsService) private readonly projectsService: ProjectsService;

  @UseGuards(AuthGuard)
  @Get('')
  async getProjects() {
    const response = await this.projectsService.getProjects();

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createProject(@Body() dto: CreateProjectDto) {
    const response = await this.projectsService.createProject(dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateProject(@Param() { id }: IDParamDto, @Body() dto: CreateProjectDto) {
    const response = await this.projectsService.updateProject(id, dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param() { id }: IDParamDto) {
    const response = await this.projectsService.deleteProject(id);

    return response;
  }
}
