import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortenerRequest } from './dto/create-shortener.dto';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

describe('ShortenerController', () => {
  let controller: ShortenerController;
  let shortenerService: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [
        {
          provide: ShortenerService,
          useValue: {
            shortenUrl: jest.fn(),
            decodeUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShortenerController>(ShortenerController);
    shortenerService = module.get<ShortenerService>(ShortenerService);
  });

  describe('create', () => {
    it('should shorten a URL and return the result', async () => {
      const createShortenerDto: CreateShortenerRequest = {
        sourceUrl: 'http://example.com',
      };
      const shortenedUrl = { url: 'http://localhost:3000/abc123' };

      jest
        .spyOn(shortenerService, 'shortenUrl')
        .mockResolvedValue(shortenedUrl);

      const result = await controller.create(createShortenerDto);

      expect(shortenerService.shortenUrl).toHaveBeenCalledWith(
        createShortenerDto,
      );
      expect(result).toEqual(shortenedUrl);
    });
  });

  describe('redirect', () => {
    it('should redirect to the original URL', async () => {
      const shortUrl = 'abc123';
      const originalUrl = { url: 'http://example.com' };

      jest.spyOn(shortenerService, 'decodeUrl').mockResolvedValue(originalUrl);

      const result = await controller.redirect(shortUrl);

      expect(shortenerService.decodeUrl).toHaveBeenCalledWith(shortUrl);
      expect(result).toEqual({
        url: originalUrl.url,
      });
    });

    it('should throw an exception when trying to redirect a URL not found', async () => {
      const shortUrl = 'invalid-url';

      jest
        .spyOn(shortenerService, 'decodeUrl')
        .mockRejectedValue(new BadRequestException('Url not found'));

      await expect(controller.redirect(shortUrl)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
