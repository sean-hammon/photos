import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GalleryProvider } from '@app/galleries';
import { PhotoProvider } from '@app/photos';
import { SessionStore } from '@app/store/session.store';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {

  constructor(
    private galleries: GalleryProvider,
    private photos: PhotoProvider,
    private router: Router,
    private session: SessionStore,
  ) { }

  ngOnInit(): void {
    const gallery = this.galleries.getFeaturedGallery();
    this.session.selectGallery(gallery.id);
    const display = this.photos.randomGalleryPhoto(gallery);
    const cmd = [
      'photo', display.photo.slug, display.hash,
      'in', 'home', gallery.id,
    ];
    this.router.navigate(cmd).then(() => {});
  }

}
