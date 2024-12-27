import { ShortenedUrl } from '../../../shortener/entities/shortened-url.entity';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';

export interface IShortenedUrlRepository {
  createShortenedUrl(data: CreateShortenedUrlDto): Promise<ShortenedUrl>;
  findShortenedUrlById(id: number): Promise<ShortenedUrl | null>;
  updateSourceUrlByShortenedUrlId(
    shortenedUrlId: number,
    newSourceUrl: string,
  ): Promise<boolean>;
  deleteShortenedUrlById(id: number): Promise<boolean>;
}
