import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GalleryProvider, Gallery } from '@app/galleries';
import { Photo } from '@app/photos';

@Injectable({ providedIn: 'root' })
export class SessionStore {

  loading$: BehaviorSubject<boolean>;
  gallery$: BehaviorSubject<Gallery>;
  photo$: BehaviorSubject<Photo>;

  constructor(
    private galleries: GalleryProvider
  ) {
    this.loading$ = new BehaviorSubject(true);
    this.gallery$ = new BehaviorSubject(null);
    this.photo$ = new BehaviorSubject(null);
  }

  setPhoto(photo: Photo) {
    this.photo$.next({...photo});
  }

  selectGallery(hash: string) {
    const current = this.gallery$.getValue();
    if (current && current.hash === hash) {
      return;
    }

    const g = { ...this.galleries.getGallery(hash) };
    g.children = this.galleries.childGalleries(g);
    this.gallery$.next(g);
  }

}
