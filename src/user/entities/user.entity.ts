import { ShortenedUrl } from '../../shortener/entities/shortened-url.entity';

export class User {
  id: number;
  email: string;
  password: string;

  ShortenedUrl?: ShortenedUrl[];

  public static fromPrismaModel(user: any): User {
    return Object.assign(new User(), user);
  }
}
