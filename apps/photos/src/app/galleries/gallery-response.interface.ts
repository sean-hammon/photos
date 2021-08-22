import { GalleryMap } from '@ui/galleries/gallery-map.interface';

export interface GalleryResponse {
  links: {
    self: string;
  };
  data: GalleryMap;
}
