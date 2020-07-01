import { Routes } from '@angular/router';
import { PhotoComponent } from './photos/photo/photo.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PhotoComponent,
        pathMatch: 'full'
    },
];