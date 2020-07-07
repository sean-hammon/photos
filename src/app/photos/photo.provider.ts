import { Injectable } from '@angular/core';
import { PhotoDisplay } from '@app/photos';
import { Photos } from '@app/photos/photo-data';
import { Galleries } from '@app/galleries/gallery-data';

@Injectable({providedIn: 'root'})
export class PhotoProvider {

  getPhoto(photoHash: string, galleryHash: string): PhotoDisplay {

    let prev = null;
    let next = null;

    const gallery = Galleries[galleryHash];
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
    const g = Galleries[galleryHash];
    const p = Photos[photoHash];
    return [
      'gallery', g.slug , galleryHash,
      'photo', p.slug , photoHash
    ];
  }
}
