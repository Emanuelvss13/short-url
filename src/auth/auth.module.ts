import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma-client';
import { REPOSITORY } from '../providers/constants/repo.constants';
import { BcryptProvider } from '../providers/criptography/bcrypt/bcrypt.provider';
import { UserPrismaRepository } from '../providers/database/prisma/user-prisma.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    UserService,
    {
      provide: REPOSITORY.USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    {
      provide: 'BcryptProvider',
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
