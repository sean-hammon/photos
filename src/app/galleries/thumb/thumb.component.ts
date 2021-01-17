import { Component, OnInit, Input, HostBinding, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Photo } from '@app/photos';
import { Router } from '@angular/router';
import { fadeAnimation } from '@app/fade.animation';
import {environment} from '@env';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class ThumbComponent implements OnInit, AfterViewInit {

  title: string;
  route: string[];
  loading: boolean;
  fadeState: string;

  @Input() item: Photo;
  @ViewChild('thumb') thumb: ElementRef;

  @HostListener('click') thumbClick(event) {
    this.router.navigate(this.route);
  }

  constructor(
    private router: Router
  ) {
    this.loading = true;
    this.fadeState = 'hidden';
  }

  ngOnInit(): void {
    this.title = this.item.title;
    this.route = this.item.route;
  }

  ngAfterViewInit(): void {
    const href = environment.api + '/photos' + this.item.files.thumb.path;
    const img = new Image();
    img.onload = () => {
      this.loading = false;
      this.fadeState = 'visible';
      this.thumb.nativeElement.style.backgroundImage = `url(${href})`;
    };
    img.onerror = (err: ErrorEvent) => {
      console.log(img.src + ' failed: ' + err.message);
    };
    img.src = href;
  }

}
