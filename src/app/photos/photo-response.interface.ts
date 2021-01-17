import {PhotoMap} from './photo-map.interface';

export interface PhotoResponse {
  links: {
    self: string;
  };
  data: PhotoMap;
}
