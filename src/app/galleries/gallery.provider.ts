import { Injectable } from '@angular/core';
import { Gallery } from './gallery.interface';
import { Galleries } from './gallery-data';
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

        const rnd = Math.floor(Math.random() * gallery.photos.length);
        const hash = gallery.photos[rnd];

        return {
          hash,
          prev: null,
          next: null,
          photo: Photos[hash]
        }
    }
}
