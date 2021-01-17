import { GalleryProvider } from '@app/galleries';
import { PhotoProvider } from '@app/photos';

export function galleryInitializer(provider: GalleryProvider) {
  return () => provider.initializeGalleries().toPromise();
}

export function photoInitializer(provider: PhotoProvider) {
  return () => provider.initializePhotos().toPromise();
}
