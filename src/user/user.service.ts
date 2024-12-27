import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from '../providers/constants/repo.constants';
import { IShortenedUrlRepository } from '../providers/database/repositories/shortened-url.repository';
import { IUserRepository } from '../providers/database/repositories/user.repository';
import { CreateUserRequest } from './dto/create-user.dto';
import { IUpdateSourceUrlRequest } from './dto/update-source-url.request';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(REPOSITORY.SHORTENED_URL_REPOSITORY)
    readonly shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  async deleteShortenedUrl(user: User, shortenedUrlId: number) {
    const shortenedUrl =
      await this.shortenedUrlRepository.findShortenedUrlById(shortenedUrlId);

    if (!shortenedUrl) {
      throw new BadRequestException('Shortened url not found');
    }

    if (!user.urlBelongsToUser(shortenedUrlId)) {
      throw new BadRequestException(
        'This shortened url does not belong to this user',
      );
    }

    try {
      await this.shortenedUrlRepository.softDeleteShortenedUrlById(
        shortenedUrlId,
      );
    } catch (error) {
      throw new BadRequestException('Unable to delete shortened url:', error);
    }

    return {
      message: 'Shortened url deleted successfully',
      statusCode: 200,
    };
  }

  async updateSourceUrl({
    shortenedUrlId,
    userId,
    newSourceUrl,
  }: IUpdateSourceUrlRequest) {
    const user = await this.findById(userId);

    const shortenedUrl =
      await this.shortenedUrlRepository.findShortenedUrlById(shortenedUrlId);

    if (!shortenedUrl) {
      throw new BadRequestException('Shortened url not found');
    }

    if (!user.urlBelongsToUser(shortenedUrlId)) {
      throw new BadRequestException(
        'This shortened url does not belong to this user',
      );
    }

    try {
      await this.shortenedUrlRepository.updateSourceUrlByShortenedUrlId(
        shortenedUrlId,
        newSourceUrl,
      );
    } catch (error) {
      throw new BadRequestException('Unable to update source url:', error);
    }

    return {
      message: 'source url changed successfully',
      statusCode: 200,
    };
  }

  async create(request: CreateUserRequest) {
    if (await this.userRepository.findUserByEmail(request.email)) {
      throw new BadRequestException('Email already exists');
    }

    return await this.userRepository.createUser(request);
  }

  async findById(id: number) {
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
