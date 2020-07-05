import { Injectable } from '@angular/core';
import { Galleries } from '@app/galleries';
import { PhotoDisplay, Photos } from '@app/photos';

@Injectable({providedIn: 'root'})
export class PhotoProvider {

  getPhoto(photoHash: string, galleryHash: string): PhotoDisplay {

    let prev = null;
    let next = null;

    const gallery = Galleries[galleryHash];
    const photo = Photos[photoHash];
    const index = gallery.photos.findIndex(hash => hash === photoHash);

    if (index + 1 < gallery.photos.length) {
      prev = index + 1;
    }

    if (index - 1 >= 0) {
      next = index - 1;
    }

    return {
      hash: photoHash,
      prev,
      next,
      photo
    };

  }
}
