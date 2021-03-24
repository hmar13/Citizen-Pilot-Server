import { Injectable, Inject } from '@nestjs/common';
import {Project} from './projects.entity';
import {ProjectDto} from './dto/project.dto';

import {PROJECT_REPOSITORY} from '../../core/constants'

@Injectable()
export class ProjectsService {
  constructor(@Inject(PROJECT_REPOSITORY) private readonly projectRepository: typeof Project) {  }

  // async create(project: ProjectDto)
}
