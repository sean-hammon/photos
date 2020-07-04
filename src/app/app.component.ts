import { GalleryProvider } from '@app/galleries';
import { SessionStore } from '@app/store/session.store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const paramCount = Object.keys(params).length;
        if (!paramCount) {
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
      });
  }

}
