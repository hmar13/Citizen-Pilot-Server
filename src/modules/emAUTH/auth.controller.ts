
import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { EmployeeDto } from '../employees/dto/employee.dto';
import { DoesEmployeeExist } from '../../core/guards/doesEmployeeExist.guard';

@Controller('authEM')
export class AuthController {
  
  constructor(private authService: AuthService) { 
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesEmployeeExist)
  @Post('signup')
  async signUp(@Body() user: EmployeeDto) {
    return await this.authService.create(user);
  }
}