import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UpdateShortenerDto } from './dto/update-shortener.dto';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto) {
    return this.shortenerService.create(createShortenerDto);
  }

  @Get()
  findAll() {
    return this.shortenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortenerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShortenerDto: UpdateShortenerDto) {
    return this.shortenerService.update(+id, updateShortenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortenerService.remove(+id);
  }
}
