import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employeesProviders } from './employees.providers';

@Module({
  providers: [EmployeeService, ...employeesProviders],
  exports: [EmployeeService],
})
export class EmployeeModule {}
