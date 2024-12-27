import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma-client';
import { REPOSITORY } from '../providers/constants/repo.constants';
import { ShortenedUrlPrismaRepository } from '../providers/database/prisma/shortend-url-prisma.repository';
import { UserPrismaRepository } from '../providers/database/prisma/user-prisma.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: REPOSITORY.USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    {
      provide: REPOSITORY.SHORTENED_URL_REPOSITORY,
      useClass: ShortenedUrlPrismaRepository,
    },
  ],
  exports: [
    REPOSITORY.USER_REPOSITORY,
    REPOSITORY.SHORTENED_URL_REPOSITORY,
    UserService,
  ],
})
export class UserModule {}
