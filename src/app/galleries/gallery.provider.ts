import { Injectable } from '@angular/core';
import { GalleryMap } from '@app/galleries/gallery-map.interface';
import { GalleryService } from '@app/galleries/gallery.service';
import { tap } from 'rxjs/operators';
import { Gallery } from './gallery.interface';
import {Photo, PhotoDisplay} from '@app/photos';
import { Photos } from '@app/photos/photo-data';

@Injectable({ providedIn: 'root' })
export class GalleryProvider {

  private galleryData: GalleryMap;

  constructor(
    private service: GalleryService
  ) { }

  initializeGalleries() {
    return this.service.loadGalleries()
      .pipe(
        tap(galleries => this.galleryData = galleries)
      );
  }

  getGallery(hash: string) {
    return {...this.galleryData[hash]};
  }

  childGalleries(parent: Gallery): Gallery[] {
    const children = parent.children as string[];
    return children
      .map(childId => {
        return {...this.galleryData[childId] };
      })
      .filter(child => !!child.title);
  }

  childThumbs(parent: Gallery) {
    let children;
    if (typeof parent.children[0] === 'string') {
      children = this.childGalleries(parent);
    } else {
      children = parent.children as Gallery[];
    }
    return children.map(child => {
      let p: Photo;
      if (child.photos.length) {
        const r = Math.floor(Math.random() * child.photos.length);
        const hash = child.photos[r];
        p  = {...Photos[hash]};
      } else {
        p = this.childThumbs(child)[0];
      }

      p.title = child.title;
      p.route = ['/gallery', child.slug, child.hash];
      return p;
    });

  }

  photos(gallery: Gallery) {
    return gallery.photos.map(hash => {
      const p = {...Photos[hash]};
      p.route = ['/photo', p.slug, hash, 'in', gallery.slug, gallery.hash];
      return p;
    });
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
