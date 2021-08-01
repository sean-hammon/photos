import { GalleryProvider } from '@app/galleries';
import { PhotoProvider } from '@app/photos';
import { SessionStore } from '@app/store/session.store';
import { forkJoin } from 'rxjs';

export function appInitializer(
  session: SessionStore,
  galleries: GalleryProvider,
  photos: PhotoProvider
) {
  const segments = document.location.href.split('/');
  const idx = segments.indexOf('shared');
  if (idx >= 0) {
    session.setSharedKey(segments[idx + 1]);
  }
  return () => forkJoin([
    galleries.initializeGalleries(),
    photos.initializePhotos()
  ]).toPromise();
}
