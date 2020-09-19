import { takeUntil, filter, take } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { PhotoProvider, PhotoDisplay, Photo } from '@app/photos';
import { Subject, forkJoin, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit, OnDestroy {

  nav = {
    next: '',
    prev: ''
  };

  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  private gHash: string;
  private unsub$: Subject<null>;
  private display$: BehaviorSubject<PhotoDisplay>;

  constructor(
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) { }

  ngOnInit(): void {
    this.unsub$ = new Subject();
    this.display$ = new BehaviorSubject(null);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.unsub$))
      .subscribe(event => {
          this.setDisplayPhoto();
      });

    this.setDisplayPhoto();
  }

  ngAfterViewInit() {
    this.display$
      .pipe(filter(obj => !!obj))
      .subscribe((display) => {
        this.updateTemplate(display);
      });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  setDisplayPhoto() {
    const params$ = this.route.params.pipe(take(1));
    const path$ = this.route.url.pipe(take(1));

    forkJoin([params$, path$])
      .subscribe(([params, path]) => {
        console.log(params, path);
        this.gHash = path.pop().toString();
        this.session.selectGallery(this.gHash);

        const display = this.photos.getPhoto(params.phash, this.gHash);
        this.nav = {
          next: display.next,
          prev: display.prev
        };
        this.display$.next(display);
        this.session.setPhoto(display.photo);
      });
  }

  updateTemplate(display: PhotoDisplay) {
    this.one.nativeElement.style.backgroundImage =
      `url(${display.photo.photo.file})`;
  }

  nextPhoto() {
    if (this.nav.next) {
      const href = this.photos.makeHref(this.nav.next, this.gHash);
      this.router.navigate(href);
    }
  }

  prevPhoto() {
    if (this.nav.prev) {
      const href = this.photos.makeHref(this.nav.prev, this.gHash);
      this.router.navigate(href);
    }
  }

}
