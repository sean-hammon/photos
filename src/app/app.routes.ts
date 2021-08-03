import { Routes } from '@angular/router';
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
    pathMatch: 'prefix',
    redirectTo: 'shared/:key'
  },
  {
    path: 'shared/:key/galleries/:ghash',
    component: GalleryComponent
  },
  {
    path: 'shared/:key',
    component: GalleryComponent
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
