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
    return this.http.get<GalleryResponse>(`${environment.api}/galleries?as=map`)
      .pipe(
        map(response => response.data)
      );
  }

}
