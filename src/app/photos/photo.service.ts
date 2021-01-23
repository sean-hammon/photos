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
    return this.http.get<PhotoResponse>(`${environment.api}/photos/all?include=files&as=map`)
      .pipe(
        map(response => response.data)
      );
  }

}
