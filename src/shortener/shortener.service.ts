import { Injectable } from '@nestjs/common';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UpdateShortenerDto } from './dto/update-shortener.dto';

@Injectable()
export class ShortenerService {
  create(createShortenerDto: CreateShortenerDto) {
    return 'This action adds a new shortener';
  }

  findAll() {
    return `This action returns all shortener`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortener`;
  }

  update(id: number, updateShortenerDto: UpdateShortenerDto) {
    return `This action updates a #${id} shortener`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortener`;
  }
}
