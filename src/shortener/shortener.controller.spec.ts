import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/entities/user.entity';
import { CreateShortenerInput } from './dto/create-shortener.input';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

describe('ShortenerController', () => {
  let controller: ShortenerController;
  let shortenerService: ShortenerService;

  const mockShortenerService = {
    shortenUrl: jest.fn(),
    decodeUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [
        {
          provide: ShortenerService,
          useValue: mockShortenerService,
        },
      ],
    }).compile();

    controller = module.get<ShortenerController>(ShortenerController);
    shortenerService = module.get<ShortenerService>(ShortenerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call shortenUrl with user and input', async () => {
      const user: User = { id: 1, username: 'testuser' } as unknown as User;
      const createShortenerInput: CreateShortenerInput = {
        sourceUrl: 'http://example.com',
      };

      await controller.create(user, createShortenerInput);

      expect(shortenerService.shortenUrl).toHaveBeenCalledWith({
        ...createShortenerInput,
        user,
      });
    });
  });

  describe('redirect', () => {
    it('should call decodeUrl with shortUrl', async () => {
      const shortUrl = 'abcd123';
      const result = { url: 'http://example.com' };
      mockShortenerService.decodeUrl.mockReturnValue(result);

      const response = await controller.redirect(shortUrl);

      expect(shortenerService.decodeUrl).toHaveBeenCalledWith(shortUrl);
      expect(response).toEqual(result);
    });
  });
});
