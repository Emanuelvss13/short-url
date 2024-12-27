import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRequest } from './dto/create-user.dto';
import { DeleteShortenedUrlInput } from './dto/delete-shortened-url.input';
import { UpdateSourceUrlInput } from './dto/update-source-url.input';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            updateSourceUrl: jest.fn(),
            deleteShortenedUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserRequest = {
        email: 'test@example.com',
        password: '123456',
      };
      const result = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        urlBelongsToUser: () => true,
      };
      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(userService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const result = {
        id: 1,
        email,
        password: '123456',
        urlBelongsToUser: () => true,
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(result);

      expect(await controller.findOne(email)).toBe(result);
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('updateSourceUrl', () => {
    it('should update source URL for the current user', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        urlBelongsToUser: () => true,
      };
      const input: UpdateSourceUrlInput = {
        shortenedUrlId: 1,
        newSourceUrl: 'http://newurl.com',
      };
      const result = { message: '', statusCode: 200 };
      jest.spyOn(userService, 'updateSourceUrl').mockResolvedValue(result);

      expect(await controller.updateSourceUrl(user, input)).toBe(result);
      expect(userService.updateSourceUrl).toHaveBeenCalledWith({
        userId: user.id,
        ...input,
      });
    });
  });

  describe('deleteShortenedUrl', () => {
    it('should delete shortened URL for the current user', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        urlBelongsToUser: () => true,
      };
      const input: DeleteShortenedUrlInput = { shortenedUrlId: 42 };
      const result = { message: '', statusCode: 200 };
      jest.spyOn(userService, 'deleteShortenedUrl').mockResolvedValue(result);

      expect(await controller.deleteShortenedUrl(user, input)).toBe(result);
      expect(userService.deleteShortenedUrl).toHaveBeenCalledWith(
        user,
        input.shortenedUrlId,
      );
    });
  });
});
