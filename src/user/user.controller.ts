import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/decorators/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserRequest } from './dto/create-user.dto';
import { DeleteShortenedUrlInput } from './dto/delete-shortened-url.input';
import { UpdateSourceUrlInput } from './dto/update-source-url.input';
import { User } from './entities/user.entity';
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

  @UseGuards(JwtAuthGuard)
  @Patch('/update-source-url')
  updateSourceUrl(
    @CurrentUser() { id }: User,
    @Body() input: UpdateSourceUrlInput,
  ) {
    return this.userService.updateSourceUrl({ userId: id, ...input });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/shortened-url')
  deleteShortenedUrl(
    @CurrentUser() user: User,
    @Body() { shortenedUrlId }: DeleteShortenedUrlInput,
  ) {
    return this.userService.deleteShortenedUrl(user, shortenedUrlId);
  }
}
