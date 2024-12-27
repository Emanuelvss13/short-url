import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserAuthGuard } from '../auth/decorators/user.guard';
import { User } from '../user/entities/user.entity';
import { CreateShortenerInput } from './dto/create-shortener.input';
import { ShortenerService } from './shortener.service';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @UseGuards(UserAuthGuard)
  @Post('/shortener')
  create(
    @CurrentUser() user: User,
    @Body() createShortenerInput: CreateShortenerInput,
  ) {
    return this.shortenerService.shortenUrl({ ...createShortenerInput, user });
  }

  @Get(':shortUrl')
  @Redirect()
  redirect(@Param('shortUrl') shortUrl: string) {
    return this.shortenerService.decodeUrl(shortUrl);
  }
}
