import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { CreateShortenerRequest } from './dto/create-shortener.dto';
import { ShortenerService } from './shortener.service';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('/shortener')
  create(@Body() createShortenerDto: CreateShortenerRequest) {
    return this.shortenerService.shortenUrl(createShortenerDto);
  }

  @Get(':shortUrl')
  @Redirect()
  redirect(@Param('shortUrl') shortUrl: string) {
    return this.shortenerService.decodeUrl(shortUrl);
  }
}
