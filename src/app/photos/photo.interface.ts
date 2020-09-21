import {ThumbData} from '@app/photos/thumb-data.interface';
import {PhotoData} from '@app/photos/photo-data.interface';

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
  thumb: ThumbData;
  photo: PhotoData;
}
