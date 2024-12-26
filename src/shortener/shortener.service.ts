import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IShortenedUrlRepository } from '../providers/database/repositories/shortened-url.repository';
import { IShorteningAlgorithm } from '../providers/shortening-algorithm/model';
import { CreateShortenerDto } from './dto/create-shortener.dto';

@Injectable()
export class ShortenerService {
  constructor(
    @Inject('ShorteningAlgorithm')
    readonly shorteningAlgorithm: IShorteningAlgorithm,
    @Inject('ShortenedUrlRepository')
    readonly shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  async shortenUrl(request: CreateShortenerDto) {
    const shortenedUrl =
      await this.shortenedUrlRepository.createShortenedUrl(request);

    const urlCode = this.shorteningAlgorithm.encodeId(shortenedUrl.id);

    console.log(urlCode);

    return {
      url: `http://localhost:3000/${urlCode}`,
    };
  }

  async decodeUrl(shortUrl: string) {
    const shortUrlId = this.shorteningAlgorithm.decodeShortenedUrl(shortUrl);

    const shortenedUrl =
      await this.shortenedUrlRepository.findShortenedUrlById(shortUrlId);

    if (!shortenedUrl) {
      throw new BadRequestException('Url not found');
    }

    return {
      url: shortenedUrl.sourceUrl,
    };
  }
}
