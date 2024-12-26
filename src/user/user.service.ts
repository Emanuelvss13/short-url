import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from '../providers/constants/repo.constants';
import { IUserRepository } from '../providers/database/repositories/user.repository';
import { CreateUserRequest } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(request: CreateUserRequest) {
    return await this.userRepository.createUser(request);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    return user;
  }
}
