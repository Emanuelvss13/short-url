import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ICryptographyProvider } from '../model';

@Injectable()
export class BcryptProvider implements ICryptographyProvider {
  private readonly salt = bcrypt.genSaltSync(10);

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
