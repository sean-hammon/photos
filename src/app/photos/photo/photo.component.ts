import { environment } from './../../../environments/environment';
import { style } from '@angular/animations';
import { GalleryProvider } from './../../galleries/gallery.provider';
import { SessionStore } from './../../store/session.store';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Galleries } from 'src/app/galleries/galleries';

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

        } else {
          this.session.selectGallery(environment.homeGallery);
          const gallery = Galleries[environment.homeGallery];
          const photo = this.galleries.randomPhoto(gallery);
          this.one.nativeElement.style.backgroundImage = `url(${photo.photo})`;
        }
      });
  }

}
