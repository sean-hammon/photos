import { GalleryProvider } from '@app/galleries';
import { SessionStore } from '@app/store/session.store';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '@env';
import { Galleries } from '@app/galleries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'photos';

  constructor(
    private galleries: GalleryProvider,
    private session: SessionStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd && event.url === '/') {
          this.getRandomPhoto();
        }
    });
  }

  getRandomPhoto() {
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
