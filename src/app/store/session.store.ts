import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gallery } from '@app/galleries';
import { Photo } from '@app/photos';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class SessionStore {

  loading$: BehaviorSubject<boolean>;
  gallery$: BehaviorSubject<Gallery>;
  photo$: BehaviorSubject<Photo>;
  api$: BehaviorSubject<string>;

  constructor( ) {
    this.loading$ = new BehaviorSubject(true);
    this.gallery$ = new BehaviorSubject(null);
    this.photo$ = new BehaviorSubject(null);
    this.api$ = new BehaviorSubject<string>(environment.api);
  }

  setSharedKey(key: string) {
    this.api$.next(`${environment.api}/shared/${key}`);
  }

  setPhoto(photo: Photo) {
    this.photo$.next({...photo});
  }

  setGallery(next: Gallery) {
    const current = this.gallery$.getValue();
    if (current && current.id === next.id) {
      return;
    }

    this.gallery$.next(next);
  }

}
