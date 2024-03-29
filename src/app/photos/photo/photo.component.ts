import { takeUntil, filter, take } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject, forkJoin, BehaviorSubject } from 'rxjs';
import { SessionStore } from '@app/store/session.store';
import { PhotoProvider, PhotoDisplay, PhotoUxHelper } from '@app/photos';
import { fadeAnimation } from '@app/fade.animation';
import { GalleryProvider } from '@app/galleries';
import { environment } from '@env';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class PhotoComponent implements OnInit, AfterViewInit, OnDestroy {

  nav = {
    next: '',
    prev: ''
  };
  fadeStates: {
    one: string,
    two: string
  };
  loading: boolean;
  activeChild: string;

  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  private gHash: string;
  private unsub$: Subject<null>;
  private display$: BehaviorSubject<PhotoDisplay>;

  private isDragging: boolean;
  private mDn: number;
  public zoomState: string;
  public styles: {
    one: any;
    two: any;
  };

  constructor(
    private galleries: GalleryProvider,
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore,

    public uxHelper: PhotoUxHelper
  ) {
    this.loading = true;
    this.zoomState = 'in';
    this.fadeStates = {
      one: 'hidden',
      two: 'hidden'
    };
    this.styles = {
      one: {},
      two: {},
    };
  }

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
        this.preloadImage(display);
      });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  setDisplayPhoto() {

    this.loading = true;

    const params$ = this.route.params.pipe(take(1));
    const path$ = this.route.url.pipe(take(1));

    forkJoin([params$, path$])
      .subscribe(([params, path]) => {
        this.gHash = path.pop().toString();
        this.galleries.selectGallery(this.gHash);

        const display = this.photos.getGalleryPhoto(params.phash, this.gHash);
        this.nav = {
          next: display.next,
          prev: display.prev
        };
        this.display$.next(display);
        this.session.setPhoto(display.photo);
      });
  }

  preloadImage(photo: PhotoDisplay) {
    const img = new Image();
    img.onload = () => this.updateTemplate(photo);
    img.onerror = (err: ErrorEvent) => console.log(photo.photo.files.hifi.path + ': ' + err.message);
    img.src = environment.api
      + environment.imageRoot
      + photo.photo.files.hifi.path;
  }

  zoom() {
    const display = this.display$.getValue();
    if (this.zoomState === 'in') {
      this.zoomState = 'out';
      this.styles[this.activeChild] = this.uxHelper.fitScreen(display.photo);
    } else {
      this.zoomState = 'in';
      this.styles[this.activeChild] = this.uxHelper.coverScreen(display.photo);
    }
  }

  hideMe(event) {
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      event.element.style.display = 'none';
    }
  }

  updateTemplate(display: PhotoDisplay) {
    if (this.activeChild === 'one') {
      this.two.nativeElement.style.display = 'block';
      this.activeChild = 'two';
    } else {
      this.one.nativeElement.style.display = 'block';
      this.activeChild = 'one';
    }

    this.styles[this.activeChild] = this.uxHelper.coverScreen(display.photo);

    const lastChild = this.activeChild === 'one' ? 'two' : 'one';
    this.fadeStates[this.activeChild] = 'visible';
    this.fadeStates[lastChild] = 'hidden';
    this.loading = false;
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

  onMouseUp() {
    const mUp = Date.now();
    const elapsed = mUp - this.mDn;
    if (elapsed < 200 && this.uxHelper.zoomActive$.getValue()) {
      this.zoom();
    }

    if (this.isDragging) {
      this.uxHelper.stopDrag();
    }
    this.isDragging = false;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.mDn = Date.now();
    this.uxHelper.startDrag(event);
  }
}
