import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './decorators/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { IUserWithoutPassword } from './response/user-without-password.response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }

  @Get('/user/whoami')
  @UseGuards(JwtAuthGuard)
  async whoami(@CurrentUser() user: User): Promise<IUserWithoutPassword> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
