import { GalleryProvider } from './../gallery.provider';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { Subject } from 'rxjs';
import { takeUntil, filter, take } from 'rxjs/operators';
import { Photo, PhotoProvider } from '@app/photos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  photos: Photo[];

  private unsub$: Subject<null>;

  constructor(
    private galleryProvider: GalleryProvider,
    private photoProvider: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) {
    this.photos = [];
  }

  ngOnInit(): void {

    this.unsub$ = new Subject();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.unsub$))
      .subscribe(event => {
        // All subsequent routes to a gallery.
        this.setGallery();
      });

    // Initial load of component
    this.setGallery();

    this.session.gallery$
    .pipe(
      filter(gallery => !!gallery),
      takeUntil(this.unsub$))
    .subscribe(g => {
      this.photos = this.photoProvider.galleryPhotos(g);
      if (!this.photos.length) {
        this.photos = this.photoProvider.childThumbs(g);
      }
    });

  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  setGallery() {

    this.route.params
    .pipe(take(1))
    .subscribe(params => {
      this.session.selectGallery(params.ghash);
    });

  }

}
