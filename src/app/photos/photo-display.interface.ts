import { Photo } from './photo.interface';

export interface PhotoDisplay {
  hash: string;
  prev: string;
  next: string;
  photo: Photo;
}
