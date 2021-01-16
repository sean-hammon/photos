import { GalleryProvider } from '@app/galleries';

export function galleryInitializer(provider: GalleryProvider) {
  return () => provider.initializeGalleries().toPromise();
}
