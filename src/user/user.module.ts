import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma-client';
import { REPOSITORY } from '../providers/constants/repo.constants';
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
  ],
})
export class UserModule {}
