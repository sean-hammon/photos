import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GalleryMap } from '@app/galleries/gallery-map.interface';
import { GalleryResponse } from '@app/galleries/gallery-response.interface';
import {environment} from '@env';

@Injectable({providedIn: 'root'})
export class GalleryService {

  constructor(
    private http: HttpClient
  ) { }

  loadGalleries(): Observable<GalleryMap> {
    return this.http.get<GalleryResponse>(`${environment.api}/galleries`)
      .pipe(
        map(response => response.data)
      );
  }

}
