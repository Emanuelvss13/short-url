import { User } from '../../user/entities/user.entity';

export class ShortenedUrl {
  id: number;
  accesses: number;
  sourceUrl: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  user?: User;
}
