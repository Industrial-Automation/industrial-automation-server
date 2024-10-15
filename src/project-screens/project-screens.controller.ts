import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import {
  CreateProjectScreenDto,
  GetProjectScreensQueryDto,
  UpdateProjectScreenDto
} from './project-screens.dto';
import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectScreensService } from './project-screens.service';

@Controller('project-screens')
export class ProjectScreensController {
  @Inject(ProjectScreensService) private readonly projectScreensService: ProjectScreensService;

  @UseGuards(AuthGuard)
  @Get('')
  async getProjectScreens(@Query() queryParams: GetProjectScreensQueryDto) {
    const response = await this.projectScreensService.getProjectScreens(queryParams);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createProjectScreen(@Body() dto: CreateProjectScreenDto) {
    const response = await this.projectScreensService.createProjectScreen(dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateProjectScreen(@Param() { id }: IDParamDto, @Body() dto: UpdateProjectScreenDto) {
    const response = await this.projectScreensService.updateProjectScreen(id, dto);

    return response;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProjectScreen(@Param() { id }: IDParamDto) {
    const response = await this.projectScreensService.deleteProjectScreen(id);

    return response;
  }
}
