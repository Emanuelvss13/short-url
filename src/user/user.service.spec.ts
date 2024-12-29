import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { REPOSITORY } from '../providers/constants/repo.constants'; // Certifique-se de importar os constantes
import { IShortenedUrlRepository } from '../providers/database/repositories/shortened-url.repository';
import { IUserRepository } from '../providers/database/repositories/user.repository';
import { ShortenedUrl } from '../shortener/entities/shortened-url.entity';
import { CreateUserRequest } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: IUserRepository;
  let shortenedUrlRepository: IShortenedUrlRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: REPOSITORY.USER_REPOSITORY, // Use a chave correta aqui
          useValue: {
            findUserByEmail: jest.fn(),
            findUserById: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: REPOSITORY.SHORTENED_URL_REPOSITORY, // Certifique-se de registrar corretamente este provedor
          useValue: {
            findShortenedUrlById: jest.fn(),
            softDeleteShortenedUrlById: jest.fn(),
            updateSourceUrlByShortenedUrlId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>(REPOSITORY.USER_REPOSITORY);
    shortenedUrlRepository = module.get<IShortenedUrlRepository>(
      REPOSITORY.SHORTENED_URL_REPOSITORY,
    );
  });

  describe('create', () => {
    it('should create a user if email does not exist', async () => {
      const dto: CreateUserRequest = {
        email: 'test@example.com',
        password: '123456',
      };

      const expectedCreateUserResult = {
        id: 1,
        email: dto.email,
        password: '123456',
        urlBelongsToUser: () => true,
      };

      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);

      jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValue(expectedCreateUserResult);

      const result = await service.create(dto);

      expect(result).toMatchObject(expectedCreateUserResult);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(dto.email);
      expect(userRepository.createUser).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException if email already exists', async () => {
      const dto: CreateUserRequest = {
        email: 'test@example.com',
        password: '123456',
      };
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: '123456',
        urlBelongsToUser: () => true,
      });

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(dto.email);
    });
  });

  describe('findById', () => {
    it('should return user if found', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        urlBelongsToUser: () => true,
      };
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(user);

      expect(await service.findById(1)).toEqual(user);
      expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(BadRequestException);
      expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('findByEmail', () => {
    it('should return user if email found', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        urlBelongsToUser: () => true,
      };
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(user);

      expect(await service.findByEmail('test@example.com')).toEqual(user);
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should throw BadRequestException if email not found', async () => {
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);

      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        BadRequestException,
      );
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });

  describe('deleteShortenedUrl', () => {
    it('should delete shortened url if it exists and belongs to user', async () => {
      const user = {
        id: 1,
        urlBelongsToUser: jest.fn().mockReturnValue(true),
      } as unknown as User;
      const shortenedUrl: ShortenedUrl = {
        id: 42,
        sourceUrl: 'http://example.com',
        user,
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        accesses: 0,
        hasExpired: jest.fn().mockReturnValue(false),
      };
      jest
        .spyOn(shortenedUrlRepository, 'findShortenedUrlById')
        .mockResolvedValue(shortenedUrl);
      jest
        .spyOn(shortenedUrlRepository, 'softDeleteShortenedUrlById')
        .mockResolvedValue(undefined);

      const result = await service.deleteShortenedUrl(user, shortenedUrl.id);
      expect(result).toEqual({
        message: 'Shortened url deleted successfully',
        statusCode: 200,
      });
      expect(shortenedUrlRepository.findShortenedUrlById).toHaveBeenCalledWith(
        shortenedUrl.id,
      );
      expect(
        shortenedUrlRepository.softDeleteShortenedUrlById,
      ).toHaveBeenCalledWith(shortenedUrl.id);
      expect(user.urlBelongsToUser).toHaveBeenCalledWith(shortenedUrl.id);
    });

    it('should throw BadRequestException if shortened url does not exist', async () => {
      jest
        .spyOn(shortenedUrlRepository, 'findShortenedUrlById')
        .mockResolvedValue(null);

      const user = { id: 1 } as User;
      await expect(service.deleteShortenedUrl(user, 42)).rejects.toThrow(
        BadRequestException,
      );
      expect(shortenedUrlRepository.findShortenedUrlById).toHaveBeenCalledWith(
        42,
      );
    });

    it('should throw BadRequestException if shortened url does not belong to user', async () => {
      const user = {
        id: 1,
        urlBelongsToUser: jest.fn().mockReturnValue(false),
      } as unknown as User;
      const shortenedUrl: ShortenedUrl = {
        id: 42,
        sourceUrl: 'http://example.com',
        user,
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        accesses: 0,
        hasExpired: jest.fn().mockReturnValue(false),
      };
      jest
        .spyOn(shortenedUrlRepository, 'findShortenedUrlById')
        .mockResolvedValue(shortenedUrl);

      await expect(
        service.deleteShortenedUrl(user, shortenedUrl.id),
      ).rejects.toThrow(BadRequestException);
      expect(user.urlBelongsToUser).toHaveBeenCalledWith(shortenedUrl.id);
    });
  });

  describe('updateSourceUrl', () => {
    it('should update source url if shortened url exists and belongs to user', async () => {
      const user = {
        id: 1,
        urlBelongsToUser: jest.fn().mockReturnValue(true),
      } as unknown as User;
      const shortenedUrl: ShortenedUrl = {
        id: 42,
        sourceUrl: 'http://example.com',
        user,
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        accesses: 0,
        hasExpired: jest.fn().mockReturnValue(false),
      };
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(user);
      jest
        .spyOn(shortenedUrlRepository, 'findShortenedUrlById')
        .mockResolvedValue(shortenedUrl);
      jest
        .spyOn(shortenedUrlRepository, 'updateSourceUrlByShortenedUrlId')
        .mockResolvedValue(undefined);

      const input = {
        shortenedUrlId: 42,
        userId: 1,
        newSourceUrl: 'http://new-url.com',
      };
      const result = await service.updateSourceUrl(input);
      expect(result).toEqual({
        message: 'source url changed successfully',
        statusCode: 200,
      });
      expect(
        shortenedUrlRepository.updateSourceUrlByShortenedUrlId,
      ).toHaveBeenCalledWith(42, input.newSourceUrl);
    });

    it('should throw BadRequestException if shortened url does not exist', async () => {
      jest
        .spyOn(shortenedUrlRepository, 'findShortenedUrlById')
        .mockResolvedValue(null);

      const input = {
        shortenedUrlId: 42,
        userId: 1,
        newSourceUrl: 'http://new-url.com',
      };
      await expect(service.updateSourceUrl(input)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if shortened url does not belong to user', async () => {
      const user = {
        id: 1,
        urlBelongsToUser: jest.fn().mockReturnValue(false),
      } as unknown as User;
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(user);
      const shortenedUrl: ShortenedUrl = {
        id: 42,
        sourceUrl: 'http://example.com',
        user,
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        accesses: 0,
        hasExpired: jest.fn().mockReturnValue(false),
      };
      jest
        .spyOn(shortenedUrlRepository, 'findShortenedUrlById')
        .mockResolvedValue(shortenedUrl);

      const input = {
        shortenedUrlId: 42,
        userId: 1,
        newSourceUrl: 'http://new-url.com',
      };
      await expect(service.updateSourceUrl(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
