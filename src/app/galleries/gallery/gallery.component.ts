import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  private unsub$: Subject<null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) { }

  ngOnInit(): void {

    this.unsub$ = new Subject();
    this.router.events
      .subscribe(event => {
        // All subsequent routes to a gallery.
        if (event instanceof NavigationEnd) {
          this.setGallery();
        }
      });

    // Initial load of component
    this.setGallery();

  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  setGallery() {

    this.route.params
    .pipe(takeUntil(this.unsub$))
    .subscribe(p => {
      this.session.selectGallery(p.ghash);
    });

  }

}
