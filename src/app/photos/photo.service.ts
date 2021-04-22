import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env';
import { PhotoResponse, PhotoMap } from '@app/photos';

@Injectable({providedIn: 'root'})
export class PhotoService {


  constructor(
    private http: HttpClient
  ) { }

  loadPhotos(): Observable<PhotoMap> {
    let api = `${environment.api}/photos/all?include=files&as=map`;
    const segments = document.location.href.split('/');
    if (segments.includes('shared')) {
      const key = segments.pop();
      api = `${environment.api}/photos/shared/${key}include=files&?as=map`;
    }
    return this.http.get<PhotoResponse>(api)
      .pipe(
        map(response => response.data)
      );
  }

}
