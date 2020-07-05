import { Injectable } from '@angular/core';
import { Gallery } from './gallery.interface';
import { Galleries } from './galleries';
import { PhotoDisplay, Photos } from '@app/photos';

@Injectable({providedIn: 'root'})
export class GalleryProvider {

    childGalleries(parent: Gallery) {
        return parent.children.map(childId => {
            return {...Galleries[childId]};
        });
    }

    photos(gallery: Gallery) {
        return [];
    }

    randomPhoto(gallery: Gallery): PhotoDisplay {

        let prev;
        let next;

        const rnd = Math.floor(Math.random() * gallery.photos.length);
        const hash = gallery.photos[rnd];
        if (gallery.photos.length < rnd + 1) {
          prev = gallery.photos[rnd + 1];
        }
        if (0 <= rnd - 1) {
          prev = gallery.photos[rnd - 1];
        }

        return {
          hash,
          prev,
          next,
          photo: Photos[hash]
        }
    }
}
