import { User } from '../../user/entities/user.entity';

export interface CreateShortenerRequest {
  sourceUrl: string;
  user?: User;
}
