import { Employee } from './employee.entity';
import { EMPLOYEE_REPOSITORY } from '../../core/constants';

export const employeesProviders = [
  {
    provide: EMPLOYEE_REPOSITORY,
    useValue: Employee,
  },
];
