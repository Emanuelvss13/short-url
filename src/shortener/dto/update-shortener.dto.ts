import { PartialType } from '@nestjs/mapped-types';
import { CreateShortenerRequest } from './create-shortener.dto';

export class UpdateShortenerDto extends PartialType(CreateShortenerRequest) {}
