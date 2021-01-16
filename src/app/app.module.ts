import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { GalleryProvider, GalleryService } from '@app/galleries';
import { galleryInitializer } from '@app/intializer.factories';

import { PhotoComponent } from './photos/photo/photo.component';
import { HomeComponent } from './photos/home/home.component';
import { GalleryComponent } from './galleries/gallery/gallery.component';
import { ThumbComponent } from './galleries/thumb/thumb.component';
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    TopbarComponent,
    BreadcrumbsComponent,
    PhotoComponent,
    HomeComponent,
    GalleryComponent,
    ThumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {enableTracing: false})
  ],
  providers: [
    GalleryProvider,
    GalleryService,
    {
      provide: APP_INITIALIZER,
      useFactory: galleryInitializer,
      deps: [GalleryProvider],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
