import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { Project as ProjectEntity } from './projects.entity';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProjectEntity> {
    const post = await this.projectService.findOne(id);
    if (!post) {
      throw new NotFoundException("This project doesn't exist");
    }

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() project: ProjectDto,
    @Request() req,
  ): Promise<ProjectEntity> {
    return await this.projectService.create(project, req.employee.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() project: ProjectDto,
    @Request() req,
  ): Promise<ProjectEntity> {
    const {
      numberOfAffectedRows,
      updatedProject,
    } = await this.projectService.update(id, project, req.employee.id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return updatedProject;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.projectService.delete(id, req.employee.id);

    if (deleted === 0) {
      throw new NotFoundException("This Project doesn't exist");
    }

    return 'Successfully deleted';
  }
}
