import { Injectable } from '@angular/core';
import { Gallery } from './gallery.interface';
import { PhotoDisplay } from '@app/photos';
import { Galleries } from './gallery-data';
import { Photos } from '@app/photos/photo-data';

@Injectable({providedIn: 'root'})
export class GalleryProvider {

    childGalleries(parent: Gallery): Gallery[] {
        const children = parent.children as string[];
        return children.map(childId => {
            return {...Galleries[childId]};
        });
    }

    photos(gallery: Gallery) {
        return gallery.photos.map(hash => Photos[hash]);
    }

    randomPhoto(gallery: Gallery): PhotoDisplay {

        const rnd = Math.floor(Math.random() * gallery.photos.length);
        const hash = gallery.photos[rnd];

        return {
          hash,
          prev: null,
          next: null,
          photo: Photos[hash]
        };
    }
}
