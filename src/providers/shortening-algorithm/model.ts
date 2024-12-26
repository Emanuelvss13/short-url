export interface IShorteningAlgorithm {
  encodeId(id: number): string;
  decodeShortenedUrl(url: string): number;
}
