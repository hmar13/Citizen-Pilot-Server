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
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    const employee = await this.employeeService.findOneByEmail(username);
    if (!user && !employee) {
      return null;
    }

    // find if user password match
    if (user) {
      const match = await this.comparePassword(pass, user.password);
      if (!match) {
        return null;
      }
      const { password, ...result } = user['dataValues'];
      return result;
    }

    // find if employee password match
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
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];

    // generate token
    // const token = await this.generateToken(result);

    // return the user and the token
    return { user: result };
  }

  public async empCreate(employee) {
    // hash the password
    const pass = await this.hashPassword(employee.password);

    // create the employee
    const newEmployee = await this.employeeService.create({ ...employee, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newEmployee['dataValues'];

    // generate token
    // const token = await this.generateToken(result);

    // return the employee and the token
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
