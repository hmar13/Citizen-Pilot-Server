import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { EmployeeDto } from '../employees/dto/employee.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { DoesEmployeeExist } from '../../core/guards/doesEmployeeExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login/user')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(DoesEmployeeExist)
  @Post('empsignup')
  async empSignup(@Body() employee: EmployeeDto) {
    return await this.authService.empCreate(employee);
  }
}
