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

  @Input() item: Photo;
  @HostBinding('style.background-image') imgUrl: string;
  @HostListener('click') thumbClick(event) {
    this.router.navigate(this.route);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.table(this.item);
    this.imgUrl = `url(${this.item.thumb})`;
    this.title = this.item.title;
    this.route = this.item.route;
  }

}
