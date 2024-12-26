import { PartialType } from '@nestjs/mapped-types';
import { CreateShortenerDto } from './create-shortener.dto';

export class UpdateShortenerDto extends PartialType(CreateShortenerDto) {}
