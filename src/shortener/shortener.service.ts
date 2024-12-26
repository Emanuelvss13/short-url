import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
  ) {}

  async shortenUrl(request: CreateShortenerDto) {
    const shortenedUrl =
      await this.shortenedUrlRepository.createShortenedUrl(request);

    const urlCode = this.shorteningAlgorithm.encodeId(shortenedUrl.id);

    return {
      url: `${this.configService.get<string>('API_DOMAIN')}/${urlCode}`,
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
