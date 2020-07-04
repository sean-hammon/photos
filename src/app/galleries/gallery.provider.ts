import { Injectable } from '@angular/core';
import { Gallery } from './gallery.interface';
import { Galleries } from './galleries';
import { Photo, Photos } from '@app/photos';

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

    randomPhoto(gallery: Gallery): Photo {
        const rnd = Math.floor(Math.random() * gallery.photos.length);
        const hash = gallery.photos[rnd];
        return Photos[hash];
    }
}
