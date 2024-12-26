import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IShortenedUrlRepository } from '../providers/database/repositories/shortened-url.repository';
import { IShorteningAlgorithm } from '../providers/shortening-algorithm/model';
import { ShortenerService } from './shortener.service';

describe('ShortenerService', () => {
  let service: ShortenerService;
  let shorteningAlgorithm: IShorteningAlgorithm;
  let shortenedUrlRepository: IShortenedUrlRepository;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        {
          provide: 'ShorteningAlgorithm',
          useValue: {
            encodeId: jest.fn(),
            decodeShortenedUrl: jest.fn(),
          },
        },
        {
          provide: 'ShortenedUrlRepository',
          useValue: {
            createShortenedUrl: jest.fn(),
            findShortenedUrlById: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000'),
          },
        },
      ],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
    shorteningAlgorithm = module.get<IShorteningAlgorithm>(
      'ShorteningAlgorithm',
    );
    shortenedUrlRepository = module.get<IShortenedUrlRepository>(
      'ShortenedUrlRepository',
    );
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('shortenUrl', () => {
    it('should return the shortened URL correctly', async () => {
      const createShortenerRequest = { sourceUrl: 'http://example.com' };

      const shortenedUrlMock = { id: 1, sourceUrl: 'http://example.com' };
      shortenedUrlRepository.createShortenedUrl = jest
        .fn()
        .mockResolvedValue(shortenedUrlMock);
      shorteningAlgorithm.encodeId = jest.fn().mockReturnValue('abc123');

      const result = await service.shortenUrl(createShortenerRequest);

      expect(shortenedUrlRepository.createShortenedUrl).toHaveBeenCalledWith(
        createShortenerRequest,
      );
      expect(shorteningAlgorithm.encodeId).toHaveBeenCalledWith(1);
      expect(result).toEqual({ url: 'http://localhost:3000/abc123' });
    });
  });

  describe('decodeUrl', () => {
    it('should return the original URL when decoding a shortUrl', async () => {
      const shortUrl = 'abc123';
      shorteningAlgorithm.decodeShortenedUrl = jest.fn().mockReturnValue(1);

      const shortenedUrlMock = { id: 1, sourceUrl: 'http://example.com' };
      shortenedUrlRepository.findShortenedUrlById = jest
        .fn()
        .mockResolvedValue(shortenedUrlMock);

      const result = await service.decodeUrl(shortUrl);

      expect(shorteningAlgorithm.decodeShortenedUrl).toHaveBeenCalledWith(
        shortUrl,
      );
      expect(shortenedUrlRepository.findShortenedUrlById).toHaveBeenCalledWith(
        1,
      );
      expect(result).toEqual({ url: 'http://example.com' });
    });

    it('should throw an exception if the shortened URL is not found', async () => {
      const shortUrl = 'abc123';
      shorteningAlgorithm.decodeShortenedUrl = jest.fn().mockReturnValue(1);
      shortenedUrlRepository.findShortenedUrlById = jest
        .fn()
        .mockResolvedValue(null);

      await expect(service.decodeUrl(shortUrl)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
