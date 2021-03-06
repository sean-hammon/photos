import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { GalleryMap } from './gallery-map.interface';
import { Gallery } from './gallery.interface';
import { GalleryService } from './gallery.service';

@Injectable({ providedIn: 'root' })
export class GalleryProvider {

  private galleryData: GalleryMap;

  constructor(
    private service: GalleryService,
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

  getFeaturedGallery(): Gallery {
      return Object.values(this.galleryData)
        .filter(gallery => gallery.featured)[0];
  }

  getSharedGallery(key: string): Gallery {
    return Object.values(this.galleryData)
      .filter(gallery => gallery.share_key === key)[0];
  }

  childGalleries(parent: Gallery): Gallery[] {
    const children = parent.children as string[];
    return children
      .map(childId => {
        return {...this.galleryData[childId] };
      })

      // child galleries might be empty and thus not
      // part of the gallery collection returned from
      // the api.

      .filter(child => !!child.title);
  }

}
