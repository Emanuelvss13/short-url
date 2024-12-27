import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma-client';
import { User } from '../../../user/entities/user.entity';
import { ICreateUserDto } from '../repositories/dto/create-user.dto';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return User.fromPrismaModel(user) || null;
  }

  async createUser(data: ICreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return User.fromPrismaModel(user);
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

    return User.fromPrismaModel(user) || null;
  }
}