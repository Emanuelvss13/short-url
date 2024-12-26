import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma-client';
import { ICreateUserDto } from '../repositories/dto/create-user.dto';
import { IUserRepository } from '../repositories/user.repository';
import { User } from './../../../../node_modules/.prisma/client/index.d';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user || null;
  }

  async createUser(data: ICreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        ShortenedUrl: true,
      },
    });

    return user || null;
  }
}
