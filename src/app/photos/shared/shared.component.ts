import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GalleryProvider } from '@app/galleries';
import { PhotoProvider } from '@app/photos';
import { SessionStore } from '@app/store/session.store';

@Component({
  selector: 'app-shared',
  template: ''
})
export class SharedComponent implements OnInit {

  constructor(
    private galleries: GalleryProvider,
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore,
  ) { }

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('key');
    const gallery = this.galleries.getSharedGallery(key);
    if (gallery) {
      this.session.selectGallery(gallery.id);
      const display = this.photos.randomGalleryPhoto(gallery);
      const cmd = [
        'photo', display.photo.slug, display.hash,
        'in', 'home', gallery.id,
      ];
      this.router.navigate(cmd).then(() => {});
    } else {
      // TODO: handle bogus share keys
    }
  }

}
