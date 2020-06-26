import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Galleries } from '../galleries/galleries';
import { Gallery } from '../galleries/gallery.interface';

@Injectable({providedIn: 'root'})
export class SessionStore {

    loading$: BehaviorSubject<boolean>;
    gallery$: BehaviorSubject<Gallery>;

    constructor() {
        this.loading$ = new BehaviorSubject(true);
        this.gallery$ = new BehaviorSubject(null);
    }

    selectGallery(id: string) {
        this.gallery$.next({...Galleries[id]});
    }

}