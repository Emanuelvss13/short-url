import { ShortenedUrl } from '../../shortener/entities/shortened-url.entity';

export class User {
  id: number;
  email: string;
  password: string;

  ShortenedUrl?: ShortenedUrl[];
}
