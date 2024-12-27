import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma-client';
import { ShortenedUrl } from '../../../shortener/entities/shortened-url.entity';
import { CreateShortenedUrlDto } from '../repositories/dto/create-shortened-url.dto';
import { IShortenedUrlRepository } from '../repositories/shortened-url.repository';

@Injectable()
export class ShortenedUrlPrismaRepository implements IShortenedUrlRepository {
  constructor(private readonly prisma: PrismaService) {}
  async softDeleteShortenedUrlById(id: number): Promise<boolean> {
    await this.prisma.shortenedUrl.update({
      where: {
        id,
      },
      data: {
        deleteDate: new Date(),
      },
    });

    return true;
  }

  async updateSourceUrlByShortenedUrlId(
    shortenedUrlId: number,
    newSourceUrl: string,
  ): Promise<boolean> {
    await this.prisma.shortenedUrl.update({
      where: {
        id: shortenedUrlId,
      },
      data: {
        sourceUrl: newSourceUrl,
      },
    });

    return true;
  }

  createShortenedUrl({
    sourceUrl,
    user,
  }: CreateShortenedUrlDto): Promise<ShortenedUrl> {
    const shortenedUrl = this.prisma.shortenedUrl.create({
      data: { sourceUrl, ...(user && { userId: user.id }) },
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
