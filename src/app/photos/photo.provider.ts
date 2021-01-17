import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GalleryProvider } from '@app/galleries';

import { PhotoDisplay } from './photo-display.interface';
import { PhotoMap } from './photo-map.interface';
import { PhotoService } from './photo.service';

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
    const photo = this.photoData[photoHash];
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
    const p = this.photoData[photoHash];
    return [
      'photo', p.slug, photoHash,
      'in', g.slug , galleryHash,
    ];
  }
}
