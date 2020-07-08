import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { PhotoProvider, PhotoDisplay } from '@app/photos';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit, OnDestroy {

  display: PhotoDisplay;

  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  private gHash: string;
  private unsub$: Subject<null>;

  constructor(
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) { }

  ngOnInit(): void {
    this.unsub$ = new Subject();
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setDisplayPhoto();
        }
      });
    this.setDisplayPhoto();
  }

  ngAfterViewInit() {
    this.setImageBackground();
  }

  ngOnDestroy() {
    console.log('photo destrory');
    this.unsub$.next();
    this.unsub$.complete();
  }

  setDisplayPhoto() {
    this.route.params
      .pipe(takeUntil(this.unsub$))
      .subscribe(p => {
        this.gHash = p.ghash;
        this.session.selectGallery(p.ghash);

        this.display = this.photos.getPhoto(p.phash, p.ghash);
        this.session.setPhoto(this.display.photo);
      });
    if (this.one) {
      this.setImageBackground();
    }
  }

  setImageBackground() {
      this.one.nativeElement.style.backgroundImage =
        `url(${this.display.photo.photo})`;
  }

  nextPhoto() {
    if (this.display.next) {
      const href = this.photos.makeHref(this.display.next, this.gHash);
      this.router.navigate(href);
    }
  }

  prevPhoto() {
    if (this.display.prev) {
      const href = this.photos.makeHref(this.display.prev, this.gHash);
      this.router.navigate(href);
    }
  }

}
