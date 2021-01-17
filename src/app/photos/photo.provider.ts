import { Injectable } from '@angular/core';
import { Photo } from '@app/photos/photo.interface';
import { tap } from 'rxjs/operators';
import { Gallery, GalleryProvider } from '@app/galleries';

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

  getPhoto(hash: string) {
    return {...this.photoData[hash]};
  }

  childThumbs(parent: Gallery) {
    let children;
    if (typeof parent.children[0] === 'string') {
      children = this.galleries.childGalleries(parent);
    } else {
      children = parent.children as Gallery[];
    }
    return children.map(child => {
      let p: Photo;
      if (child.photos.length) {
        const r = Math.floor(Math.random() * child.photos.length);
        const hash = child.photos[r];
        p  = this.getPhoto(hash);
      } else {
        p = this.childThumbs(child)[0];
      }

      p.title = child.title;
      p.route = ['/gallery', child.slug, child.hash];
      return p;
    });

  }
  galleryPhotos(gallery: Gallery) {
    return gallery.photos.map(hash => {
      const p = this.getPhoto(hash);
      p.route = ['/photo', p.slug, hash, 'in', gallery.slug, gallery.hash];
      return p;
    });
  }

  getGalleryPhoto(photoHash: string, galleryHash: string): PhotoDisplay {

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

  randomGalleryPhoto(gallery: Gallery): PhotoDisplay {

    const rnd = Math.floor(Math.random() * gallery.photos.length);
    const hash = gallery.photos[rnd];

    return {
      hash,
      prev: null,
      next: null,
      photo: this.getPhoto(hash)
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
