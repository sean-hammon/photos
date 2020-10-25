import { takeUntil, filter, take } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject, forkJoin, BehaviorSubject } from 'rxjs';
import { SessionStore } from '@app/store/session.store';
import { PhotoProvider, PhotoDisplay } from '@app/photos';
import {PhotoUxHelper} from '@app/photos/photo-ux.helper';
import { fadeAnimation } from '@app/fade.animation';

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

  constructor(
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore,
    private uxHelper: PhotoUxHelper
  ) {
    this.loading = true;
    this.fadeStates = {
      one: 'hidden',
      two: 'hidden'
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

  preloadImage(photo: PhotoDisplay) {
    const img = new Image();
    img.onload = () => this.updateTemplate(photo);
    img.onerror = (err: ErrorEvent) => console.log(photo.photo.photo.href + ': ' + err.message);
    img.src = photo.photo.photo.href;
  }

  updateTemplate(display: PhotoDisplay) {
    if (this.activeChild === 'one') {
      this.activeChild = 'two';
    } else {
      this.activeChild = 'one';
    }

    const styles = this.uxHelper.coverScreen(display.photo);
    for (const key in styles) {
      if (styles.hasOwnProperty(key)){
        this[this.activeChild].nativeElement.style[key] = styles[key];
      }
    }

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
    if (this.isDragging) {
      this.uxHelper.stopDrag();
    }
    this.isDragging = false;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    let direction = 'ns';
    const current = this.display$.getValue();
    if (current.photo.photo.width < current.photo.photo.height) {
      direction = 'ew';
    }
    this.uxHelper.startDrag(direction, event);
  }
}
