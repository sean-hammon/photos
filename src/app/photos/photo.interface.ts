import { FileData } from './file-data.interface';

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
  files: {
    [size: string]: FileData;
  };
}
