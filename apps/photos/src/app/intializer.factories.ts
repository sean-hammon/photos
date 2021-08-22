import { forkJoin } from 'rxjs';
import { GalleryProvider } from '@ui/galleries';
import { PhotoProvider } from '@ui/photos';
import { SessionStore } from '@ui/store/session.store';

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
  return () =>
    forkJoin([
      galleries.initializeGalleries(),
      photos.initializePhotos(),
    ]).toPromise();
}
