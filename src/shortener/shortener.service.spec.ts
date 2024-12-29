import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IShortenedUrlRepository } from '../providers/database/repositories/shortened-url.repository';
import { IShorteningAlgorithm } from '../providers/shortening-algorithm/model';
import { CreateShortenerRequest } from './dto/create-shortener.request';
import { ShortenerService } from './shortener.service';

describe('ShortenerService', () => {
  let shortenerService: ShortenerService;
  let shorteningAlgorithm: IShorteningAlgorithm;
  let shortenedUrlRepository: IShortenedUrlRepository;
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
            increaseAccessCountByShortenedUrlId: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    shortenerService = module.get<ShortenerService>(ShortenerService);
    shorteningAlgorithm = module.get<IShorteningAlgorithm>(
      'ShorteningAlgorithm',
    );
    shortenedUrlRepository = module.get<IShortenedUrlRepository>(
      'ShortenedUrlRepository',
    );
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('shortenUrl', () => {
    it('should return the shortened URL', async () => {
      const request: CreateShortenerRequest = {
        sourceUrl: 'http://example.com',
      };
      const createdShortenedUrl = { id: 1 };
      const encodedUrlCode = 'abc123';
      const apiDomain = 'http://short.ly';

      // Mock the methods
      shortenedUrlRepository.createShortenedUrl = jest
        .fn()
        .mockResolvedValue(createdShortenedUrl);
      shorteningAlgorithm.encodeId = jest.fn().mockReturnValue(encodedUrlCode);
      configService.get = jest.fn().mockReturnValue(apiDomain);

      // Call the method
      const result = await shortenerService.shortenUrl(request);

      // Assertions
      expect(shortenedUrlRepository.createShortenedUrl).toHaveBeenCalledWith(
        request,
      );
      expect(shorteningAlgorithm.encodeId).toHaveBeenCalledWith(
        createdShortenedUrl.id,
      );
      expect(configService.get).toHaveBeenCalledWith('API_DOMAIN');
      expect(result).toEqual({ url: `${apiDomain}/${encodedUrlCode}` });
    });
  });

  describe('decodeUrl', () => {
    it('should return the original URL if the shortened URL exists and has not expired', async () => {
      const shortUrl = 'http://short.ly/abc123';
      const shortUrlId = 1;
      const foundShortenedUrl = {
        id: 1,
        sourceUrl: 'http://example.com',
        hasExpired: jest.fn().mockReturnValue(false),
      };

      // Mock the methods
      shorteningAlgorithm.decodeShortenedUrl = jest
        .fn()
        .mockReturnValue(shortUrlId);
      shortenedUrlRepository.findShortenedUrlById = jest
        .fn()
        .mockResolvedValue(foundShortenedUrl);

      // Call the method
      const result = await shortenerService.decodeUrl(shortUrl);

      // Assertions
      expect(shorteningAlgorithm.decodeShortenedUrl).toHaveBeenCalledWith(
        shortUrl,
      );
      expect(shortenedUrlRepository.findShortenedUrlById).toHaveBeenCalledWith(
        shortUrlId,
      );
      expect(foundShortenedUrl.hasExpired).toHaveBeenCalled();
      expect(result).toEqual({ url: foundShortenedUrl.sourceUrl });
    });

    it('should throw BadRequestException if the shortened URL does not exist', async () => {
      const shortUrl = 'http://short.ly/abc123';
      const shortUrlId = 1;

      // Mock the methods
      shorteningAlgorithm.decodeShortenedUrl = jest
        .fn()
        .mockReturnValue(shortUrlId);
      shortenedUrlRepository.findShortenedUrlById = jest
        .fn()
        .mockResolvedValue(null);

      // Call the method and expect exception
      await expect(shortenerService.decodeUrl(shortUrl)).rejects.toThrow(
        BadRequestException,
      );
      expect(shorteningAlgorithm.decodeShortenedUrl).toHaveBeenCalledWith(
        shortUrl,
      );
      expect(shortenedUrlRepository.findShortenedUrlById).toHaveBeenCalledWith(
        shortUrlId,
      );
    });

    it('should throw BadRequestException if the shortened URL has expired', async () => {
      const shortUrl = 'http://short.ly/abc123';
      const shortUrlId = 1;
      const foundShortenedUrl = {
        id: 1,
        sourceUrl: 'http://example.com',
        hasExpired: jest.fn().mockReturnValue(true),
      };

      // Mock the methods
      shorteningAlgorithm.decodeShortenedUrl = jest
        .fn()
        .mockReturnValue(shortUrlId);
      shortenedUrlRepository.findShortenedUrlById = jest
        .fn()
        .mockResolvedValue(foundShortenedUrl);

      // Call the method and expect exception
      await expect(shortenerService.decodeUrl(shortUrl)).rejects.toThrow(
        BadRequestException,
      );
      expect(shorteningAlgorithm.decodeShortenedUrl).toHaveBeenCalledWith(
        shortUrl,
      );
      expect(shortenedUrlRepository.findShortenedUrlById).toHaveBeenCalledWith(
        shortUrlId,
      );
      expect(foundShortenedUrl.hasExpired).toHaveBeenCalled();
    });
  });
});
