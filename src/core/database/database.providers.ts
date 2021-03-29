import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Proposal } from '../../modules/proposals/proposals.entity';
import { News } from '../../modules/news/news.entity';
import { Employee } from '../../modules/employees/employee.entity';
import { Project } from '../../modules/projects/projects.entity';
import { Favourite } from '../../modules/favourites/favourites.entity';
import { Report } from '../../modules/reports/reports.entity';
import { Contact } from '../../modules/contacts/contacts.entity';
import { Votes } from '../../modules/votes/votes.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Employee,
        Proposal,
        Project,
        News,
        Favourite,
        Report,
        Contact,
        Votes,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
