import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { EmployeeModule } from './modules/employees/employee.module';
import { NewsModule } from './modules/news/news.module';
import { VotesModule } from './modules/votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProposalsModule,
    FavouritesModule,
    ReportsModule,
    ProjectsModule,
    EmployeeModule,
    ContactsModule,
    ProjectsModule,
    EmployeeModule,
    NewsModule,
    FavouritesModule,
    ReportsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
