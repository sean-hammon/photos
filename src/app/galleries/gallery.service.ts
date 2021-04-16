import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from '@env';
import { GalleryMap } from './gallery-map.interface';
import { GalleryResponse } from './gallery-response.interface';

@Injectable({providedIn: 'root'})
export class GalleryService {

  constructor(
    private http: HttpClient
  ) { }

  loadGalleries(): Observable<GalleryMap> {
    let api = `${environment.api}/galleries?as=map`;
    const segments = document.location.href.split('/');
    if (segments.includes('shared')) {
      const key = segments.pop();
      api = `${environment.api}/galleries/share/${key}?as=map`;
    }

    return this.http.get<GalleryResponse>(api)
      .pipe(
        map(response => response.data)
      );
  }

}
