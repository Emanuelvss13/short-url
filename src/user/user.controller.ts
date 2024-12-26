import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserRequest) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findOne(@Body('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
