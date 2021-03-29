import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { projectsProviders } from './projects.providers';
import { ProjectsController } from './projects.controller';
@Module({
  providers: [ProjectsService, ...projectsProviders],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
