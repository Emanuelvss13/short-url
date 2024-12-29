import { User } from '../../../../user/entities/user.entity';

export interface CreateShortenedUrlDto {
  sourceUrl: string;
  user?: User;
  expiredAt?: Date;
}
