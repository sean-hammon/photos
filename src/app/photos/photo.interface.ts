export interface Photo {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  long_desc: string;
  canonical_gallery_id: string;
  route: string[];
  thumb: string;
  photo: string;
}
