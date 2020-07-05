import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionStore } from '@app/store/session.store';
import { Galleries, GalleryProvider } from '@app/galleries';
import { PhotoProvider, PhotoDisplay } from '@app/photos';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit {

  private display: PhotoDisplay;
  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  constructor(
    private galleries: GalleryProvider,
    private photos: PhotoProvider,
    private route: ActivatedRoute,
    private session: SessionStore
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.params
      .subscribe(p => {
        if (p.phash) {
          this.display = this.photos.getPhoto(p.phash, p.ghash);
          this.session.setPhoto(this.display.photo);
          this.one.nativeElement.style.backgroundImage =
            `url(${this.display.photo.photo})`;
        }
      });
  }

}
