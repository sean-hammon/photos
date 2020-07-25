import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { environment } from '@env';
import { GalleryProvider } from '@app/galleries';
import { Galleries } from '@app/galleries/gallery-data';

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
      'photo', display.photo.slug, display.hash,
      'in', 'home', environment.homeGallery,
    ];
    this.router.navigate(cmd);
  }

}
