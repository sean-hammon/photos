import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { PhotoComponent } from './photos/photo/photo.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AppComponent,
        pathMatch: 'full'
    },
    {
      path: 'gallery/:gtitle/:ghash/photo/:ptitle/:phash',
      component: PhotoComponent
    },
    {
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }
];
