import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { SessionStore } from '@app/store/session.store';

import { GalleryMap } from './gallery-map.interface';
import { Gallery } from './gallery.interface';
import { GalleryService } from './gallery.service';

@Injectable({ providedIn: 'root' })
export class GalleryProvider {
  private galleryData: GalleryMap;

  constructor(private service: GalleryService, private session: SessionStore) {}

  initializeGalleries() {
    return this.service
      .loadGalleries()
      .pipe(tap((galleries) => (this.galleryData = galleries)));
  }

  getGallery(hash: string) {
    return { ...this.galleryData[hash] };
  }

  selectGallery(hash: string) {
    const g = this.getGallery(hash);
    g.children = this.childGalleries(g);
    this.session.setGallery(g);
  }

  getFeaturedGallery(): Gallery {
    const shareKey = this.session.sharedKey$.getValue();
    if (shareKey) {
      return Object.values(this.galleryData).filter(
        (gallery) => gallery.share_key === shareKey
      )[0];
    } else {
      return Object.values(this.galleryData).filter(
        (gallery) => gallery.featured
      )[0];
    }
  }

  getSharedGallery(key: string): Gallery {
    return Object.values(this.galleryData).filter(
      (gallery) => gallery.share_key === key
    )[0];
  }

  childGalleries(parent: Gallery): Gallery[] {
    const children = parent.children as string[];
    return (
      children
        .map((childId) => {
          return { ...this.galleryData[childId] };
        })

        // child galleries might be empty and thus not
        // part of the gallery collection returned from
        // the api.

        .filter((child) => !!child.title)
    );
  }
}
