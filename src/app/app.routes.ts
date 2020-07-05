import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { PhotoComponent } from './photos/photo/photo.component';

export const ROUTES: Routes = [
    {
      path: 'gallery/:gtitle/:ghash/photo/:ptitle/:phash',
      component: PhotoComponent
    },
    {
        path: '',
        component: AppComponent,
        pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }
];
