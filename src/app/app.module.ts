import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { ROUTES } from './app.routes';
import { HomeComponent } from './photos/home/home.component';
import { GalleryComponent } from './galleries/gallery/gallery.component';
import { ThumbComponent } from './galleries/thumb/thumb.component';

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
    RouterModule.forRoot(ROUTES, {enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
