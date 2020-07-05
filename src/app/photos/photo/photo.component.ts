import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { PhotoProvider, PhotoDisplay } from '@app/photos';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit {

  display: PhotoDisplay;

  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  private gHash: string;

  constructor(
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(p => {
        this.gHash = p.ghash;
        this.display = this.photos.getPhoto(p.phash, p.ghash);
        this.session.setPhoto(this.display.photo);
      });
  }

  ngAfterViewInit() {
    if (this.display) {
      this.one.nativeElement.style.backgroundImage =
        `url(${this.display.photo.photo})`;
    }
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
