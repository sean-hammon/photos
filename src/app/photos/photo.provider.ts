import { Injectable } from '@angular/core';
import { GalleryProvider } from '@app/galleries';
import { PhotoDisplay } from '@app/photos';
import { Photos } from '@app/photos/photo-data';

@Injectable({providedIn: 'root'})
export class PhotoProvider {

  private photoData: PhotoMap;

  constructor(
    private service: PhotoService,
    private galleries: GalleryProvider
  ) { }

  initializePhotos() {
    return this.service.loadPhotos()
      .pipe(
        tap(photos => this.photoData = photos)
      );
  }

  getPhoto(photoHash: string, galleryHash: string): PhotoDisplay {

    let prev = null;
    let next = null;

    const gallery = this.galleries.getGallery(galleryHash);
    const photo = Photos[photoHash];
    const index = gallery.photos.findIndex(hash => hash === photoHash);

    if (index + 1 < gallery.photos.length) {
      next = gallery.photos[index + 1];
    }

    if (index - 1 >= 0) {
      prev = gallery.photos[index - 1];
    }

    return {
      hash: photoHash,
      prev,
      next,
      photo
    };

  }

  makeHref(photoHash: string, galleryHash: string): string[] {
    const g = this.galleries.getGallery(galleryHash);
    const p = Photos[photoHash];
    return [
      'photo', p.slug, photoHash,
      'in', g.slug , galleryHash,
    ];
  }
}
