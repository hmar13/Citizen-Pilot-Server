import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
<<<<<<< HEAD
import { FavouritesModule } from './modules/favourites/favourites.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { EmployeeModule } from './modules/employees/employee.module';
=======
import { ProjectsModule } from './modules/projects/projects.module';
import { EmployeeModule } from './modules/employees/employee.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { ReportsModule } from './modules/reports/reports.module';

>>>>>>> 662c41330dad917a4b95ff1c4001b128dff7ec47

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProposalsModule,
<<<<<<< HEAD
    FavouritesModule,
    ReportsModule,
    ProjectsModule,
    EmployeeModule,
=======
    ProjectsModule,
    EmployeeModule,
    FavouritesModule,
    ReportsModule,
>>>>>>> 662c41330dad917a4b95ff1c4001b128dff7ec47
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
