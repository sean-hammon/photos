import { Component, OnInit } from '@angular/core';
import { SessionStore } from '@app/store/session.store';
import { environment } from '@env';
import { Galleries, GalleryProvider } from '@app/galleries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {

  constructor(
    private galleries: GalleryProvider,
    private router: Router,
    private session: SessionStore,
  ) { }

  ngOnInit(): void {
    this.session.selectGallery(environment.homeGallery);
    const gallery = Galleries[environment.homeGallery];
    const display = this.galleries.randomPhoto(gallery);
    const cmd = [
      'gallery',
      'home', environment.homeGallery,
      'photo', display.photo.slug, display.hash
    ];
    this.router.navigate(cmd);
  }

}
