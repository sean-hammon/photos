import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GalleryMap } from './gallery-map.interface';
import { GalleryResponse } from './gallery-response.interface';
import { SessionStore } from '@ui/store/session.store';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  constructor(private http: HttpClient, private session: SessionStore) {}

  loadGalleries(): Observable<GalleryMap> {
    const api = this.session.api$.getValue() + '/galleries?as=map';
    return this.http
      .get<GalleryResponse>(api)
      .pipe(map((response) => response.data));
  }
}
