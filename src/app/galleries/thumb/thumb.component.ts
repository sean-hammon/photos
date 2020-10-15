import { Component, OnInit, Input, HostBinding, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Photo } from '@app/photos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit, AfterViewInit {

  title: string;
  route: string[];
  loading: boolean;

  @Input() item: Photo;
  @ViewChild('thumb') thumb: ElementRef;

  @HostListener('click') thumbClick(event) {
    this.router.navigate(this.route);
  }

  constructor(
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.title = this.item.title;
    this.route = this.item.route;
  }

  ngAfterViewInit(): void {
    const img = new Image();
    img.onload = () => {
      this.loading = false;
      this.thumb.nativeElement.style.backgroundImage = `url(${this.item.thumb.file})`;
    };
    img.onerror = (err: ErrorEvent) => {
      console.log(img.src + ' failed: ' + err.message);
    };
    img.src = this.item.thumb.file;
  }

}
