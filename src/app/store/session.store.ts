import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Galleries } from '../galleries/gallery-data';
import { GalleryProvider, Gallery } from '@app/galleries';
import { Photo } from '@app/photos';

@Injectable({ providedIn: 'root' })
export class SessionStore {

  loading$: BehaviorSubject<boolean>;
  gallery$: BehaviorSubject<Gallery>;
  photo$: BehaviorSubject<Photo>;

  constructor(
    private galleryProvider: GalleryProvider
  ) {
    this.loading$ = new BehaviorSubject(true);
    this.gallery$ = new BehaviorSubject(null);
    this.photo$ = new BehaviorSubject(null);
  }

  setPhoto(photo: Photo) {
    this.photo$.next({...photo});
  }

  selectGallery(id: string) {
    const g = { ...Galleries[id] };
    g.children = this.galleryProvider.childGalleries(g);
    this.gallery$.next(g);
  }

}
