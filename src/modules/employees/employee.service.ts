import { Injectable, Inject } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeDto } from './dto/employee.dto';
import { EMPLOYEE_REPOSITORY } from '../../core/constants';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: typeof Employee,
  ) {}

  async create(employee: EmployeeDto): Promise<Employee> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.employeeRepository.create<Employee>(employee);
  }

  async findOneByEmail(email: string): Promise<Employee> {
    return await this.employeeRepository.findOne<Employee>({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<Employee> {
    return await this.employeeRepository.findOne<Employee>({ where: { id } });
  }
}
