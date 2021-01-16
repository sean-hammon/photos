import {GalleryMap} from '@app/galleries/gallery-map.interface';

export interface GalleryResponse {
  links: {
    self: string;
  };
  data: GalleryMap;
}
