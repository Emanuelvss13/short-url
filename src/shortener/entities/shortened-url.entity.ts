import { User } from '../../user/entities/user.entity';

export class ShortenedUrl {
  id: number;
  accesses: number;
  sourceUrl: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  expiredAt?: Date;
  user?: User;

  public hasExpired(): boolean {
    return this.expiredAt && this.expiredAt.getTime() < Date.now();
  }

  public static fromPrismaModel(shortenedUrl: any): ShortenedUrl {
    return Object.assign(new ShortenedUrl(), shortenedUrl);
  }
}
