import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma-client';
import { ShortenedUrl } from '../../../shortener/entities/shortened-url.entity';
import { IShortenedUrlRepository } from '../repositories/shortened-url.repository';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';

@Injectable()
export class ShortenedUrlPrismaRepository implements IShortenedUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  createShortenedUrl(data: CreateShortenedUrlDto): Promise<ShortenedUrl> {
    const shortenedUrl = this.prisma.shortenedUrl.create({
      data,
    });

    return shortenedUrl;
  }

  async findShortenedUrlById(id: number): Promise<ShortenedUrl> {
    const shortenedUrl = await this.prisma.shortenedUrl.findFirst({
      where: {
        id,
      },
    });

    return shortenedUrl || null;
  }
}
