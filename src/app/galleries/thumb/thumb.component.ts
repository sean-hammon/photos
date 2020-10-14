import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Photo } from '@app/photos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {

  title: string;
  route: string[];
  loading: boolean;

  @Input() item: Photo;
  @HostBinding('style.background-image') imgUrl: string;
  @HostListener('click') thumbClick(event) {
    this.router.navigate(this.route);
  }

  constructor(
    private router: Router
  ) {
    this.loading = true;
   }

  ngOnInit(): void {
    const thumb = new Image();
    thumb.onload = () => {
      this.loading = false;
      this.imgUrl = `url(${this.item.thumb.url})`;
    };
    thumb.src = this.item.thumb.url;

    this.title = this.item.title;
    this.route = this.item.route;
  }

}
