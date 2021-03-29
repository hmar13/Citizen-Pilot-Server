import { Project } from './projects.entity';
import { PROJECT_REPOSITORY } from '../../core/constants';

export const projectsProviders = [
  {
    provide: PROJECT_REPOSITORY,
    useValue: Project,
  },
];
