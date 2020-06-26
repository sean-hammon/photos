import { Injectable } from "@angular/core";
import { Gallery } from './gallery.interface';
import { Galleries } from './galleries';

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
}