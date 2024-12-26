import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BcryptProvider } from './../providers/criptography/bcrypt/bcrypt.provider';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('BcryptProvider')
    private bcryptProvider: BcryptProvider,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email não encontrado');
    }

    const validPassword = await this.bcryptProvider.compare(
      pass,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = {
      sub: user.id,
      email: email,
    };

    const token = await this.jwtService.signAsync(payload);

    if (!token) {
      throw new BadRequestException('Não foi possível gerar o JWT Token!');
    }
    return {
      access_token: token,
    };
  }
}
