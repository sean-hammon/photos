import { Routes } from '@angular/router';
import { SharedComponent } from '@app/photos/shared/shared.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { HomeComponent } from './photos/home/home.component';
import { GalleryComponent } from './galleries/gallery/gallery.component';

export const ROUTES: Routes = [
    {
      path: 'photo/:pslug/:phash',
      children: [
        {
          path: '**',
          component: PhotoComponent
        }
      ]
    },
    {
      path: 'gallery/shared/:key',
      component: SharedComponent
    },
    {
      path: 'gallery/:gslug/:ghash',
      component: GalleryComponent
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
