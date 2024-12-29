import { User } from '../../user/entities/user.entity';

export interface CreateShortenerRequest {
  sourceUrl: string;
  expiredAt?: Date;
  user?: User;
}
