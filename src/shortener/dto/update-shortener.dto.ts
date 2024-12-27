import { PartialType } from '@nestjs/mapped-types';
import { CreateShortenerInput } from './create-shortener.input';

export class UpdateShortenerDto extends PartialType(CreateShortenerInput) {}
