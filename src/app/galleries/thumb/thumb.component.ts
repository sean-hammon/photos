import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Photo } from '@app/photos';
import { Gallery } from '@app/galleries';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {

  @Input() item: Photo | Gallery;
  @HostBinding('style.background-image') imgUrl: string;

  title: string;

  constructor() { }

  ngOnInit(): void {
    console.table(this.item);
    this.imgUrl = `url(${this.item.thumb})`;
    this.title = this.item.title;
  }

}
