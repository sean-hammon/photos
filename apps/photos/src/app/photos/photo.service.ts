import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoResponse, PhotoMap } from '@ui/photos';
import { SessionStore } from '@ui/store/session.store';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient, private session: SessionStore) {}

  loadPhotos(): Observable<PhotoMap> {
    const api =
      this.session.api$.getValue() + '/photos/all?include=files&as=map';
    return this.http
      .get<PhotoResponse>(api)
      .pipe(map((response) => response.data));
  }
}
