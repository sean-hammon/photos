import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { PhotoComponent } from './photos/photo/photo.component';
import { HomeComponent } from './photos/home/home.component';

export const ROUTES: Routes = [
    {
      path: 'gallery/:gtitle/:ghash/photo/:ptitle/:phash',
      component: PhotoComponent
    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }
];
