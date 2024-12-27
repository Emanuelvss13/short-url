import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './decorators/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginInput } from './dto/login.input';
import { IUserWithoutPassword } from './response/user-without-password.response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginInput) {
    return this.authService.login(email, password);
  }

  @Get('/user/whoami')
  @UseGuards(JwtAuthGuard)
  async whoami(@CurrentUser() user: User): Promise<IUserWithoutPassword> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
