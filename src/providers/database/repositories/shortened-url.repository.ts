import { ShortenedUrl } from '../../../shortener/entities/shortened-url.entity';

export interface IShortenedUrlRepository {
  createShortenedUrl(): Promise<ShortenedUrl>;
  findShortenedUrlById(id: number): Promise<ShortenedUrl | null>;
}
