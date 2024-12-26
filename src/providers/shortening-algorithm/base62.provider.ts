import base62 from 'base62';
import { IShorteningAlgorithm } from './model';

export class base62Provider implements IShorteningAlgorithm {
  encodeId(id: number): string {
    return base62.encode(id);
  }

  decodeShortenedUrl(url: string): number {
    return base62.decode(url);
  }
}
