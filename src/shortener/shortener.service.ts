import { Inject, Injectable } from '@nestjs/common';
import { IShorteningAlgorithm } from '../providers/shortening-algorithm/model';
import { CreateShortenerDto } from './dto/create-shortener.dto';

@Injectable()
export class ShortenerService {
  constructor(
    @Inject('ShorteningAlgorithm')
    readonly shorteningAlgorithm: IShorteningAlgorithm,
  ) {}

  create(createShortenerDto: CreateShortenerDto) {
    const shortenedUrl = this.shorteningAlgorithm.encodeId(1232);

    return {
      url: `http://localhost:3000/${shortenedUrl}`,
    };
  }
}
