import { Injectable } from '@nestjs/common';
import { decode, encode } from 'base62';
import { IShorteningAlgorithm } from './model';

@Injectable()
export class base62Provider implements IShorteningAlgorithm {
  encodeId(id: number): string {
    return encode(id);
  }

  decodeShortenedUrl(url: string): number {
    return decode(url);
  }
}
