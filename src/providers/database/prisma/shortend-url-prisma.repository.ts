import { PrismaService } from '../../../../prisma/prisma-client';
import { ShortenedUrl } from '../../../shortener/entities/shortened-url.entity';
import { IShortenedUrlRepository } from '../repositories/shortened-url.repository';

export class ShortenedUrlPrismaRepository implements IShortenedUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  createShortenedUrl(): Promise<ShortenedUrl> {
    throw new Error('Method not implemented.');
  }

  async findShortenedUrlById(id: number): Promise<ShortenedUrl> {
    const shortenedUrl = await this.prisma.shortenedUrl.findUnique({
      where: {
        id,
      },
    });

    return shortenedUrl || null;
  }
}
