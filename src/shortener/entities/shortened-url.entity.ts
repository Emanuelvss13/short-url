export class ShortenedUrl {
  id: number;
  accesses: number;
  sourceUrl: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
