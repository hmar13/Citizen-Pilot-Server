import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {projectsProviders} from './projects.providers';
@Module({
  providers: [ProjectsService, ...projectsProviders],
  controllers:[],
  exports: [ProjectsService]
})
export class ProjectsModule {}
