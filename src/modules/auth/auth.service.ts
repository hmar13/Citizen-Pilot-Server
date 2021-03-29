import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmployeeService } from '../employees/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByEmail(username);
    const employee = await this.employeeService.findOneByEmail(username);
    if (!user && !employee) {
      return null;
    }

    if (user) {
      const match = await this.comparePassword(pass, user.password);
      if (!match) {
        return null;
      }
      const { password, ...result } = user['dataValues'];
      return result;
    }

    if (employee) {
      const match = await this.comparePassword(pass, employee.password);
      if (!match) {
        return null;
      }
      const { password, ...result } = employee['dataValues'];
      return result;
    }
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];

    return { user: result };
  }

  public async empCreate(employee) {
    const pass = await this.hashPassword(employee.password);
    const newEmployee = await this.employeeService.create({
      ...employee,
      password: pass,
    });
    const { password, ...result } = newEmployee['dataValues'];
    return { employee: result };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
