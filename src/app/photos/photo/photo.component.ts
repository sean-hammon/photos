import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env';
import { SessionStore } from '@app/store/session.store';
import { Galleries, GalleryProvider } from '@app/galleries';
import { Photos } from '@app/photos';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit {

  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  constructor(
    private galleries: GalleryProvider,
    private route: ActivatedRoute,
    private session: SessionStore
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.params
      .subscribe(p => {
        if (p.hash) {
          const photo = Photos[p.hash];
          this.session.setPhoto(photo);
        } else {
          this.session.selectGallery(environment.homeGallery);
          const gallery = Galleries[environment.homeGallery];
          const photo = this.galleries.randomPhoto(gallery);
          this.session.setPhoto(photo);
          this.one.nativeElement.style.backgroundImage = `url(${photo.photo})`;
        }
      });
  }

}
