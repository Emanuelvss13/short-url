import { User } from '../../../user/entities/user.entity';
import { ICreateUserDto } from './dto/create-user.dto';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: ICreateUserDto): Promise<User>;
  findUserById(id: number): Promise<User | null>;
}
