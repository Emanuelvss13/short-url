import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { decode, encode } from 'base62';
import { IShorteningAlgorithm } from './model';

@Injectable()
export class base62Provider implements IShorteningAlgorithm {
  encodeId(id: number): string {
    let encodedId: string;

    try {
      encodedId = encode(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Unable to generate url: ${error}`,
      );
    }

    return encodedId;
  }

  decodeShortenedUrl(url: string): number {
    let decodedId: number;

    try {
      decodedId = decode(url);
    } catch (error) {
      throw new InternalServerErrorException(
        `Unable to generate url: ${error}`,
      );
    }

    return decodedId;
  }
}
