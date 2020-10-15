import { FileData } from '@app/photos/file-data.interface';

export interface Photo {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  long_desc: string;
  canonical_gallery_id: string;
  height: number;
  width: number;
  route: string[];
  thumb: FileData;
  photo: FileData;
}
