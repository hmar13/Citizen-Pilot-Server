import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { Project as ProjectEntity } from './projects.entity';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async findAll() {
    // get all projects in the db
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProjectEntity> {
    // find the post with this id
    const post = await this.projectService.findOne(id);

    // if the project doesn't exist in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException('This project doesn\'t exist')
    }

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() project: ProjectDto, @Request() req): Promise<ProjectEntity> {
    // create a new project and return the newly created project
    return await this. projectService.create(project, req.employee.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() project: ProjectDto, @Request() req): Promise<ProjectEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedProject } = await this.projectService.update(id, project, req.employee.id);

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This Post doesn\'t exist');
    }

    // return the updated post
    return updatedProject;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.projectService.delete(id, req.employee.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
        throw new NotFoundException('This Project doesn\'t exist');
    }

    // return success message
    return 'Successfully deleted';
  }
}
