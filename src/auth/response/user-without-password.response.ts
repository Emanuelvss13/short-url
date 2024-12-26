import { ShortenedUrl } from '../../shortener/entities/shortened-url.entity';

export interface IUserWithoutPassword {
  id: number;
  email: string;
  ShortenedUrl?: ShortenedUrl[];
}
