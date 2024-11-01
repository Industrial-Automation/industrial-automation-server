import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';

import { IDParamDto } from '../common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTagDto } from './project-tags.dto';
import { ProjectTagsService } from './project-tags.service';

@Controller('project-tags')
export class ProjectTagsController {
  @Inject(ProjectTagsService) private readonly projectTagsService: ProjectTagsService;

  @UseGuards(AuthGuard)
  @Get('writable/:id')
  async getWritableTags(@Param() { id: projectId }: IDParamDto) {
    const response = await this.projectTagsService.getWritableTags(projectId);

    return response;
  }

  @UseGuards(AuthGuard)
  @Get('readable/:id')
  async getReadableTags(@Param() { id: projectId }: IDParamDto) {
    const response = await this.projectTagsService.getReadableTags(projectId);

    return response;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTagElement(@Param() { id: projectId }: IDParamDto, @Body() dto: UpdateTagDto) {
    const response = await this.projectTagsService.updateTagElement(projectId, dto);

    return response;
  }
}
